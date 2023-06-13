import { ME_USER } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendation = (props) => {
    const usersFavGenre = useQuery(ME_USER)
    console.log(usersFavGenre.data)

    if (usersFavGenre.loading) {
        return <div>Loading.....</div>
    }

    let recommended = props.books.filter(b => b.genres.includes(usersFavGenre.data.me.favouriteGenre))
    console.log(recommended)

    return (
        <div>
            <h1>Recommendations</h1>
            <h4>Books in your favourite genre: {usersFavGenre.data.me.favouriteGenre}</h4>
            <table>
                <thead>
                    <tr>
                        <th>
                            book
                        </th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {recommended.map((r) => (
                    <tr key={r.title}>
                        <td>
                            {r.title}
                        </td>
                        <td>
                            {r.author.name}
                        </td>
                        <td>
                            {r.published}
                        </td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendation