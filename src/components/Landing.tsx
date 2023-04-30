import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

export default function Landing() {
  return (
    <main className="flex flex-col m-auto w-1/2 gap-8 justify-center items-center h-full">
      <div className="text-4xl font-semibold">Welcome to TodoStreak 👋</div>
      <div className="text-3xl ">A TodoList app with a Social Twist</div>
      <Button size="xl" onClick={() => signIn()}>
        Sign In
      </Button>
    </main>
  );
}
