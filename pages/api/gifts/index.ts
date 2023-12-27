import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })
  //potential responses
  const handleCase: ResponseFuncs = {
    //Response for GET requests
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Gift } = await connect() //connect to database
      res.json(await Gift.find({}).catch(catcher))
    },
    //Response for POST requests
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Gift } = await connect() //connect to database
      res.json(await Gift.create(req.body).catch(catcher))
    },
  }
  //Check if there is a response for the particular method, if so invoke it, if not respond with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

//Exports thee aabove block/sections of code which handle GET and POST requests
export default handler
//GET and POST routes working on Postman