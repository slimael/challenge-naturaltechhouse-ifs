'use client';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export default function Search ({placeholder}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const handleSearch = (e) => {
        const params = new URLSearchParams(searchParams);
        const search = e.target.value;
        if (!search) {
            params.delete('search');
        } else {
            params.set('search', search);
        }
        router.replace(`${pathname}?${params.toString()}`);
        
    }
    return (
        <div>
            <input onChange={(e) => {handleSearch(e)}} type="search" placeholder={placeholder} className="p-3 border border-gray-300 rounded-md" />
        </div>
    )
}