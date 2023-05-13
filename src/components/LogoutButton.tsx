import { pb } from "../services/pb"

export default function LogoutButton() {
  const logOut = () => {
    pb.authStore.clear()
  }

  return <button onclick={logOut}>Logout</button>
}
