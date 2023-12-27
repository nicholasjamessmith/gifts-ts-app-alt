import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //Captures request method, typed as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
  //Function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })
  //Grabs ID from req.query (where next stores params)
  const id: string = req.query.id as string
  //Potential responses for /gifts/:id
  const handleCase: ResponseFuncs = {
    //Response for GET requests (Show Route)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Gift } = await connect() // Connects to database
      res.json(await Gift.findById(id).catch(catcher))
    },
    //Response for PUT requests (Edit)
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Gift } = await connect() //Connects to database
      res.json(await Gift.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher))
    },
  }
}
