import { TextInput, Label, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function Search() {
  const [search, setSearch] = useState("");
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
    console.log(data);
    return data;
  };

  const queryclient = useQueryClient();
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: "users",
    queryFn: getUsers,
    enabled: false,
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    refetch();
  };

  data && console.log(data);
  return (
    <>
      <Label htmlFor="search" value="Search Users"></Label>
      <TextInput id="search" type="text" name="search" value={search} onChange={change}></TextInput>
      <span>{search}</span>
      {data ? (
        <div>
          {data.map((e: any) => {
            return <span key={e.id}>{e.email}</span>;
          })}
        </div>
      ) : (
        <div>No Data yet</div>
      )}

      {isFetching && <Spinner />}
    </>
  );
}
