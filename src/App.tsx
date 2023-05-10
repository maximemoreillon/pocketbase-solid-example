import PocketBase from "pocketbase"
import { createSignal, For, onMount } from "solid-js"
import styles from "./App.module.css"

export default function App() {
  const [movies, setMovies] = createSignal<any[]>([])
  const pb = new PocketBase("http://172.16.98.151:8080")

  onMount(async () => {
    const data = await pb.collection("movies").getList(1, 50)
    setMovies(data.items)
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
    </div>
  )
}
