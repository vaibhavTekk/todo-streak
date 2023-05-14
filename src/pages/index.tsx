import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function Landing() {
  return (
    <main className="flex flex-col m-auto w-1/2 gap-8 justify-center items-center h-full">
      <div className="text-4xl font-semibold">Welcome to TodoStreak 👋</div>
      <div className="text-3xl ">A TodoList app with a Social Twist</div>
      <Button
        size="xl"
        onClick={() =>
          signIn(undefined, { callbackUrl: "/dashboard" }).catch((err) => toast.error("Error Logging In!"))
        }
      >
        Sign In
      </Button>
    </main>
  );
}
