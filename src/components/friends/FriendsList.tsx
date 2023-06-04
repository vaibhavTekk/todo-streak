import { Avatar, Button, Spinner } from "flowbite-react";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import UserItem from "./UserItem";

export default function FriendsList({ user }: any) {
  const getFollowing = async () => {
    const response = await fetch("api/users/getFollowing").then((res) => res.json());
    return response;
  };

  const { isLoading, isError, data, error, isFetching } = useQuery("friends", getFollowing);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner size="xl"></Spinner>
      </div>
    );
  } else if (isError) {
    toast.error("Error Loading Todos");
    return <div>Error....</div>;
  }
  return (
    <div className="flex flex-col border-[2px] rounded-lg shadow-sm p-2">
      {data && (
        <div className="flex flex-col p-4">
          {data.following.map((e: any) => {
            //console.log(e);
            return <UserItem key={e.id} user={e}></UserItem>;
          })}
        </div>
      )}
      {isFetching && (
        <div className="text-center m-8">
          <Spinner size="xl"></Spinner>
        </div>
      )}
    </div>
  );
}
