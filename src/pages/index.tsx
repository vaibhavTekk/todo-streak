import Form from "@/components/list/form";
import TodoList from "@/components/list/TodoList";
import Landing from "@/components/Landing";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <main>
        <TodoList></TodoList>
        <Form></Form>
      </main>
    );
  } else {
    return <Landing></Landing>;
  }
}
