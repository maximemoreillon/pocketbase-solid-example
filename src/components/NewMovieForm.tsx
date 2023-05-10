import { createStore } from "solid-js/store"
import { pb } from "../services/pb"
import { NewMovie } from "../services/domain"
import styles from "./NewMovieForm.module.css"

export default function NewMovieForm() {
  const collection = "movies"

  const [newMovie, setNewMovie] = createStore<NewMovie>({
    title: "",
    year: 2000,
  })

  const submit = (event: Event) => {
    event.preventDefault()
    pb.collection(collection).create(newMovie)
  }

  return (
    <form onSubmit={submit} class={styles.form}>
      <input
        type="text"
        placeholder="Title"
        value={newMovie.title}
        onInput={(e) => setNewMovie("title", e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={newMovie.year}
        onInput={(e) => setNewMovie("year", Number(e.target.value))}
      />
      <button type="submit">Add new movie</button>
    </form>
  )
}
