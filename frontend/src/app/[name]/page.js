'use client';
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/navigation";
import Loading from "../components/loading";
import Image from 'next/image'
import { Suspense } from "react";
const API = "http://localhost:8080/pokemon";
function Details({ name }) {
    const fetcher = () => fetch(`${API}/${name}`).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`api/${name}`, fetcher);
    const router = useRouter()
    // retornar a la pagina anterior
    const handleClicked = () => {
        router.back()
    }
    if (error) return "An error has occurred.";
    if (!data || isLoading) return <div className="bg-gray-100"><Loading /></div>;
    const { pokemon } = data;
    const stats = pokemon.stats.map((stat, index) => (
        <li key={index} className="text-gray-700">
            <p key={index}>{stat.name} : {stat.base}</p>
        </li>
    ));
    const abilities = pokemon.abilities.map((ability, index) => (
        <li key={index} className="text-gray-700">
            <p key={index}>{ability.name}</p>
        </li>
    ));
    const types = pokemon.types.map((type, index) => (
        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{type.name}</span>
    ));
    return (

        <article className="flex items-center justify-center min-h-screen bg-gray-100 text-slate-950">

            <div className="max-w-lg w-1/2 p-8 bg-white rounded-lg shadow-md">
                <div className="w-5 text-center text-cyan-50 top-0 left-10  hover:underline bg-red-500 rounded-90">
                    <button onClick={() => {
                        handleClicked()
                    }}>
                        {"<"}
                    </button>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-center">
                    {pokemon.name}

                </h1>
                <div className="relative">
                    <picture>
                        <img
                            key={pokemon.key}
                            alt={pokemon.name}
                            className="absolute  w-25  top-0 right-5 object-cover "
                            src={pokemon.image}
                        />
                    </picture>
                </div>
                <section className="container">
                    <div class="mb-8">
                        <h4 class=" font-bold mb-4">Stats:</h4>
                        <ul class="list-item ">
                            {stats}
                        </ul>
                    </div>

                </section>
                <section className="container">
                    <h4 class=" font-bold mb-4">Abilities:</h4>
                    <ul className="mb-4">
                        {abilities}
                    </ul>
                </section>
                <section className="container">
                    <h4 class=" font-bold mb-4">types:</h4>
                    <ul className="mb-4">
                        {types}
                    </ul>
                </section>
                <p className="opacity-90">{pokemon.description}</p>
            </div>

        </article>

    );

}

export default function PokemonDetails({ params: { name } }) {
    console.log(name, 'name')
    return (
        <Suspense>
            <SWRConfig>
                <Details name={name} />
            </SWRConfig>
        </Suspense>

    );
}