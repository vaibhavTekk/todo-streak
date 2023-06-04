import { Avatar, Button } from "flowbite-react";

export default function UserItem({ user }: any) {
  const handleFollow = async () => {
    console.log(user.id);
    const response = await fetch(`api/users/follow/${user.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    console.log(response);
    return response;
  };

  return (
    <div className="flex flex-row p-8 gap-2 items-center">
      <Avatar img={user.image}></Avatar>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <Button onClick={handleFollow}>Follow</Button>
    </div>
  );
}
