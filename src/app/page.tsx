"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
// import { useState } from "react";

const queryClient = new QueryClient();

function Home() {
  // const [data, setData] = useState([]);
  // const data = await fetch("localhost:3000/api/posts", {
  //   cache: "no-store",
  // });

  // console.log(data);

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch("/api/posts", {
  //       cache: "no-store",
  //     });
  //     const d = await response.json();
  //     setData(d);
  //   };

  //   getData();
  // }, []);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  type Post = {
    title: string;
    content: string;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((post: Post) => (
        <table>
          <tr>
            <td>{post.title}</td>
            <td>{post.content}</td>
          </tr>
          <tr>
            <td>Cell C</td>
            <td>Cell D</td>
          </tr>
        </table>
      ))}
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
