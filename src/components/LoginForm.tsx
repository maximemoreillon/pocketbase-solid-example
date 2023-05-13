import { createSignal } from "solid-js"
import { pb } from "../services/pb"
import styles from "./LoginForm.module.css"

export default function LoginForm() {
  const [email, setEmail] = createSignal<string>("")
  const [password, setPassword] = createSignal<string>("")

  const submit = async (event: Event) => {
    event.preventDefault()
    const authData = await pb.admins.authWithPassword(email(), password())
    console.log(authData)
  }

  return (
    <form onSubmit={submit} class={styles.form}>
      <input
        type="text"
        placeholder="E-mail"
        value={email()}
        onInput={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
