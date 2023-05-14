import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function PageNavbar() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      toast.error("Unauthenticated");
    },
  });

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="http://localhost:3000">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Todo-Streak</span>
      </Navbar.Brand>
      {session ? (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img={session.user?.image} rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{session.user?.name}</span>
              <span className="block truncate text-sm font-medium">{session.user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/dashboard">Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        <Button
          onClick={() =>
            signIn(undefined, { callbackUrl: "/dashboard" }).catch((err) => toast.error("Error Signing in!"))
          }
        >
          Sign In
        </Button>
      )}
    </Navbar>
  );
}
