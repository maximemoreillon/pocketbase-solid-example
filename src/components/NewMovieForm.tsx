import { createSignal } from "solid-js"
import { pb } from "../services/pb"

export default function App() {
  const collection = "movies"

  // TODO:  TS interface
  const [newMovie, setNewMovie] = createSignal<any>({ title: "", year: 2000 })

  const submit = async (event: Event) => {
    event.preventDefault()
    await pb.collection(collection).create(newMovie())
  }

  return (
    <form onSubmit={submit}>
      <h2>Add new movie</h2>
      {/* TODO: Set value to match that of JS */}
      <input
        type="text"
        placeholder="Title"
        onInput={(e) => setNewMovie({ ...newMovie(), title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        onInput={(e) =>
          setNewMovie({ ...newMovie(), year: Number(e.target.value) })
        }
      />
      <button type="submit">Add new movie</button>
    </form>
  )
}
