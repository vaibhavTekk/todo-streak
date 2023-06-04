import { TextInput, Label, Spinner, Button } from "flowbite-react";
import React, { FormEvent, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import UserItem from "./UserItem";

export default function Search() {
  const [search, setSearch] = useState<string>("");

  const getUsers = async () => {
    const data = await fetch("api/users/search", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        searchterm: search,
      }),
    }).then((res) => res.json());
    //console.log(data);
    return data;
  };

  const queryclient = useQueryClient();
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: "users",
    queryFn: getUsers,
    enabled: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };
  //data && console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="search" value="Search Users"></Label>
        <TextInput
          id="search"
          type="text"
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></TextInput>
        <Button type="submit">Submit</Button>
      </form>
      {data ? (
        <div className="flex flex-col p-4">
          {data.map((e: any) => {
            return <UserItem key={e.id} user={e}></UserItem>;
          })}
        </div>
      ) : (
        <div>No Data yet</div>
      )}

      {isFetching && <Spinner />}
    </>
  );
}
