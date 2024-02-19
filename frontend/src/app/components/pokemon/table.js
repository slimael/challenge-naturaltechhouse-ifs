
import Pagination from "../paginate"
export default function Table({ data =[]}) {
   debugger
   console.log(data)
    return (  
        <  >
  <div className="flex flex-col items-center justify-center">
            <table className="table-auto">
                <thead className="table-fixed ">
                    <tr className="">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Abilities</th>
                        <th className="px-4 py-2">Stats</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pokemon, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{pokemon.name}</td>
                            <td className="border px-4 py-2">{
                                pokemon.types.map((type, index) => (
                                    <p key={index}>{type.name}</p>
                                ))}
                            </td>
                            <td className="border px-4 py-2">{
                                 pokemon.types.map((type, index) => (
                                    <p key={index}>{type.name}</p>
                                ))
                            }</td>
                            <td className="border px-4 py-2"> 
                            {
                                pokemon.stats.map((stat, index) => (
                                    <p key={index}>{stat.name} : {stat.base}</p>
                                ))
                            }
                            </td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination totalPages={10} />
        </div>
        </>
      
    )
}