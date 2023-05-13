import LoginForm from "./components/LoginForm"
import LogoutButton from "./components/LogoutButton"
import NewMovieForm from "./components/NewMovieForm"
import MoviesTable from "./components/MoviesTable"
import styles from "./App.module.css"
import { createSignal, onMount, Show } from "solid-js"
import { pb } from "./services/pb"

export default function App() {
  const [authenticated, setAuthenticated] = createSignal<boolean>(false)

  onMount(() => {
    setAuthenticated(pb.authStore.isValid)
  })

  pb.authStore.onChange((token) => {
    setAuthenticated(!!token)
  })

  return (
    <div class={styles.App}>
      <h1>My favorite movies</h1>

      <Show when={!authenticated()}>
        <LoginForm />
      </Show>

      <Show when={authenticated()}>
        <MoviesTable />
        <h2>Add new movie</h2>
        <NewMovieForm />
        <p>
          <LogoutButton />
        </p>
      </Show>
    </div>
  )
}
