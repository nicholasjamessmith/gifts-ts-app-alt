//Interface to define our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

//Interface to define our Gift model on the frontend
export interface Gift {
  _id?: number,
  item: string,
  link: string,
  completed: boolean
}