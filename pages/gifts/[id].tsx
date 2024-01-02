import { Gift } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"

//Define Prop Interface
interface ShowProps {
  gift: Gift
  url: string
}

//Define Component
function Show(props: ShowProps) {
  //get the next router, so we can use router.push later
  const router = useRouter()
  // set the gift as state for modification
  const [gift, setGift] = useState<Gift>(props.gift)
  //function to mark a gift as purchased
  const handleComplete = async () => {
    if (!gift.completed) {
      //make a copy of gift with completed set to true
      const newGift: Gift = { ...gift, completed: true }
      //make api call to change completed in database
      await fetch(props.url + "/" + gift._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        //send copy of todo with property
        body: JSON.stringify(newGift),
      })
      //once data is updated update state spo UI matches without needing to refresh
      setGift(newGift)
    }
    //if completed is already true this function won't do anything
  }
  
  //Function for handling delete button click
  const handleDelete = async () => {
    await fetch(props.url + "/" + gift._id, {
      method: "delete",
    })
    //push user back to main page after deleting
    router.push("/")
  }
  
  //return JSX
  return (
    <div>
      <h1>{gift.item}</h1>
      <h2>{gift.link}</h2>
      <h2>{gift.completed ? "Purchased" : "Need to Purchase"}</h2>
      <button onClick={handleComplete}>Purchased</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push("/")
        }}
      >
        Go Back
      </button>
    </div>
  )
}

//Define Server Side Props
export async function getServerSideProps(context: any) {
  //fetch the gift, the param was received via context.query.id
  const res = await fetch(process.env.API_URL + "/" + context.query.id)
  const gift = await res.json()
  //return the serverSideProps the gift and the url from out env veriables for frontend api calls
  return { props: { gift, url: process.env.API_URL } }
}

//export component
export default Show