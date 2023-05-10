import { createSignal, For, onMount, onCleanup } from "solid-js"
import styles from "./App.module.css"
import { pb } from "./services/pb"
import NewMovieForm from "./components/NewMovieForm"

export default function App() {
  const collection = "movies"

  // TODO:  TS interface
  const [movies, setMovies] = createSignal<any[]>([])

  onMount(async () => {
    const data = await pb.collection(collection).getList(1, 50)
    setMovies(data.items)

    pb.collection(collection).subscribe("*", ({ action, record }) => {
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
          </tr>
        </thead>
        <tbody>
          <For each={movies()}>
            {(movie) => (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>

      <NewMovieForm />
    </div>
  )
}
