import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

export default function Landing() {
  return (
    <main className="flex flex-col m-auto w-1/2 justify-center items-center h-full">
      <span className="text-6xl">Welcome to TodoStreak 👋</span>
      <Button size="xl" onClick={() => signIn()}>
        Sign In
      </Button>
    </main>
  );
}
