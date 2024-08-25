import express from "express";
import fs from 'fs'
import bodyParser from "body-parser"
import Joi from "@hapi/joi"

const app = express()
// This bodyParser is to accept json body in http request
app.use(bodyParser)



// function to read the data in json db
const readData = () => {
  try {
    const data = fs.readFileSync("./db.json")
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

// Function to write the json db data
const writeDate = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data)
    )
  } catch (error) {
    console.log(error)
  }
}

app.get("/task", (req, res) => {
  const data = readData()
  res.json(data.task)
})

app.post("/task", (req, res)  => {
  const data = readData()
  const body = req.body
  const newTask = {

  }
})

app.listen(3000, () => console.log("Server listening on port 3000"))