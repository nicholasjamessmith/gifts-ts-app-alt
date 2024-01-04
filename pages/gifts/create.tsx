import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useRef } from "react"
import { Gift } from "../../utils/types"

//Define props
interface CreateProps {
  url: string
}

//Define Component
function Create(props: CreateProps) {
  //get the next route
  const router = useRouter()
  //****************************************************** */ */
  //Uncontrolled form since there is one input* (Note: I used multiple inputs so, need to adjust this)
  const item = useRef<HTMLInputElement>(null)
  //********************************************************* */

  //Function to create new Gift
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    //Construct new Gift, create variable, check if item.current is not null to pass type checks
    let gift: Gift = { item: "", link: "", completed: false }
    if (null !== item.current) {
      gift = { item: item.current.value, link: "", completed: false }
    }
    //Make the API request
    await fetch(props.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gift),
    })
    //After API request, push back to main page
    router.push("/")
  }

  return (
    <div>
      <h1>Add a Gift</h1>
      <form onSubmit={handleSubmit}>
        <input title="item" type="text" ref={item}></input>
        <input type="submit" value="Add Gift"></input>
      </form>
    </div>
  )
}

//export getStaticProps to provide API_URL to component
export async function getStaticProps(context: any) {
  return {
    props: {
      url: process.env.API_URL,
    },
    //url: process.env.API_URL,
  }
}
//export component
export default Create
//Testing deployment