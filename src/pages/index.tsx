import LoginBtn from "@/components/auth/login-btn";
import Form from "@/components/list/form";
import TodoList from "@/components/list/TodoList";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <main>
        <LoginBtn></LoginBtn>
        <Form></Form>
        <TodoList></TodoList>
      </main>
    );
  } else {
    return (
      <main>
        <LoginBtn></LoginBtn>
      </main>
    );
  }
}
