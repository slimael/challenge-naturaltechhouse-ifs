"use client";
import Search from "./components/search";
import Table from "./components/pokemon/table";
import useSWR, { SWRConfig } from "swr";
import { Suspense } from "react";

export default function Home() {

  return (
    <Suspense>
      <SWRConfig value={{}}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100 text-slate-950">
          <h1 className="text-6xl font-bold p-4">Pokemon</h1>
          <Search placeholder="Search  by name or type" />
          <Table />

        </main>
      </SWRConfig>
    </Suspense>

  );
}
