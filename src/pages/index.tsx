import LoginBtn from "@/components/auth/login-btn";
import Form from "@/components/form";
import TodoList from "@/components/todolist";
export default function Home() {
  return (
    <main>
      <LoginBtn></LoginBtn>
      <Form></Form>
      <TodoList></TodoList>
    </main>
  );
}
