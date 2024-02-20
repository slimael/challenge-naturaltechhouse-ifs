'use client';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder, onHandleSearch }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);
        const search = e.target.value;
        if (!search) {
            params.delete('search');
        } else {
            params.set('search', search);
        }
        params.set('page', 1);
        router.replace(`${pathname}?${params.toString()}`);


    }, 900)
    return (
        <>
            <input onChange={(e) => { handleSearch(e) }} type="search" placeholder={placeholder} className="p-3 border text-gray-600 border-gray-300 rounded-md focus:border-red-500 active:border-red-500 focus-visible:border-red-500  " />
        </>
    )
}