import { createStore } from "solid-js/store"
import { pb } from "../services/pb"
import { NewMovie } from "../services/domain"

export default function NewMovieForm() {
  const collection = "movies"

  const [newMovie, setNewMovie] = createStore<NewMovie>({
    title: "",
    year: 2000,
  })

  const submit = async (event: Event) => {
    event.preventDefault()
    await pb.collection(collection).create(newMovie)
  }

  return (
    <form onSubmit={submit}>
      <h2>Add new movie</h2>
      {/* TODO: Set value to match that of JS */}
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
