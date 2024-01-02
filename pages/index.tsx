import { Gift } from "../utils/types"
import Link from "next/link"

//Define the components props
interface IndexProps {
  gifts: Array<Gift>
}

//define the page component
function Index(props: IndexProps) {
  const { gifts } = props
  
  return (
    <div>
      <h1>My Gift List</h1>
      <h2>Click on a Gift to See it Individually</h2>
      {/* Mapping over the gifts */}
      {gifts.map(t => (
        <div key={t._id}>
          <Link href={`/gifts/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "Purchased" : "Not Purchased"}
            </h3>
          </Link>
        </div>
      ))}
      <Link href="/gifts/create"><button>Add a Gift</button></Link>
    </div>
  )
}

//Get props for server side rendering
export async function getServerSideProps() {
  //Get figt data from API
  const res = await fetch(process.env.API_URL as string)
  const gifts = await res.json()
  
  //return props
  return {
    props: { gifts },
  }
}

export default Index