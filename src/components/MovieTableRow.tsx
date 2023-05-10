import { Movie } from "../services/domain"
import { pb } from "../services/pb"

interface Props {
  movie: Movie
}

export default function MovieTableRow({ movie }: Props) {
  const deleteMovie = () => {
    pb.collection("movies").delete(movie.id)
  }
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.year}</td>
      <td>
        <button onclick={deleteMovie}>Delete</button>
      </td>
    </tr>
  )
}
