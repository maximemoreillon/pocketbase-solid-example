import styles from "./MoviesTable.module.css"
import { pb } from "../services/pb"
import MovieTableRow from "./MovieTableRow"
import { createSignal, For, onMount, onCleanup, Show } from "solid-js"
import { Movie } from "../services/domain"

export default function MoviesTable() {
  const collection = "movies"

  const [movies, setMovies] = createSignal<Movie[]>([])

  onMount(async () => {
    const data = await pb.collection(collection).getList<Movie>(1, 50)
    setMovies(data.items)

    pb.collection(collection).subscribe<Movie>("*", ({ action, record }) => {
      if (action === "create") setMovies([...movies(), record])
      else if (action === "delete")
        setMovies(movies().filter((m) => m.id !== record.id))
      else if (action === "update") {
        setMovies(movies().filter((m) => m.id !== record.id))
        setMovies([...movies(), record])
      }
    })
  })

  onCleanup(() => {
    pb.collection(collection).unsubscribe()
  })

  return (
    <table class={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <For each={movies()}>{(movie) => <MovieTableRow movie={movie} />}</For>
      </tbody>
    </table>
  )
}
