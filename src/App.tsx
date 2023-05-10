import { createSignal, For, onMount, onCleanup } from "solid-js"
import { pb } from "./services/pb"
import { Movie } from "./services/domain"
import NewMovieForm from "./components/NewMovieForm"
import MovieTableRow from "./components/MovieTableRow"
import styles from "./App.module.css"

export default function App() {
  const collection = "movies"

  const [movies, setMovies] = createSignal<Movie[]>([])

  onMount(async () => {
    const data = await pb.collection(collection).getList<Movie>(1, 50)
    setMovies(data.items)

    pb.collection(collection).subscribe<Movie>("*", ({ action, record }) => {
      if (action === "create") setMovies([...movies(), record])
      else if (action === "delete")
        setMovies(movies().filter((m) => m.id !== record.id))
    })
  })

  onCleanup(() => {
    pb.collection(collection).unsubscribe()
  })

  return (
    <div class={styles.App}>
      <h1>My favorite movies</h1>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <For each={movies()}>
            {(movie) => <MovieTableRow movie={movie} />}
          </For>
        </tbody>
      </table>

      <NewMovieForm />
    </div>
  )
}
