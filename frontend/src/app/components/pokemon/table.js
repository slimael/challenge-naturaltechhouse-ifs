
'use client';

import Pagination from "../paginate"
import useSWR from "swr";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "../loading";
const API = "http://localhost:8080/pokemon/";
export default function Table({ }) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const search = params.get('search') || '';
    const page = Number(params.get('page')) || 1;

    const fetcher = url => fetch(`${API}?search=${search}&page=${page}`).then(r => r.json())
    const { data, error, isLoading } = useSWR(`/api/data/${search}/${page}`, fetcher);

    if (error) return "An error has occurred.";

    if (!data || isLoading) return (<Loading />);
    const { pokemons, totalPages } = data;
    if (!pokemons) {
        return "No results found";
    }
    const cards = pokemons?.map((pokemon, index) => {
        return (

            <div className="p-4 relative" key={`${pokemon.name}${index}`}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-50 transition-opacity duration-900 ">
                    {/* <img className="w-full" src="imagen.jpg" alt="Imagen"> */}
                    <picture>
                        <img
                            key={pokemon.key}
                            alt={pokemon.name}
                            className="absolute top-5 right-10 w-50 h-55 object-cover opacity-30"
                            src={pokemon.image}
                        />
                    </picture>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-gray-900 uppercase">
                            <Link key={pokemon.name} href={`/${pokemon.name}`}>
                                {pokemon.name}
                            </Link></div>
                        <h4 className="text-gray-800 py-2">Stats</h4>
                        <ul className="mb-4">
                            {pokemon.stats.map((stat, index) => (

                                <li key={index} className="text-gray-700">
                                    <p key={index}>{stat.name} : {stat.base}</p>
                                </li>
                            ))}

                        </ul>
                        <div>
                            {pokemon.types.map((type, index) => (
                                <span key={type.name} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{type.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        )
    });
    return (

        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cards}
            </div>
            {totalPages > 0 && <div className="flex items-center justify-center"><Pagination totalPages={totalPages} currentPage={page} /> </div>}
        </div>


    )
}