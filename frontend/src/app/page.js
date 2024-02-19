"use client";
import Search from "./components/search";
import Table from "./components/pokemon/table";
import useSWR, { SWRConfig } from "swr";
import { useSearchParams} from "next/navigation";
 

const API = "http://localhost:8080/pokemon/";

function RenderTable() {
  
  
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  
  const fetcher = url => fetch(`${API}?${params.toString()}`,{ cache: 'force-cache' }).then(r => r.json())
  const { data, error } = useSWR('/api/data', fetcher);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div className="w-full">
      <Table data={data}></Table>
    </div>
  );
}

export default function Home() {
  

  return (
    <SWRConfig value={{  }}>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Pokemon</h1>
      <Search placeholder="Search for a Pokemon"  />
      <RenderTable />

    </main>
    </SWRConfig>
  );
}
