import express from "express";
import fs from 'fs'
import Joi from "@hapi/joi"

const app = express()
// This bodyParser is to accept json body in http request
app.use(express.json())

// Task schema
const taskScheme = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
})

const taskEditScheme = Joi.object({
  name: Joi.string(),
  description: Joi.string()
})

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
const writeData = (data) => {
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

app.post("/task", (req, res) => {
  const data = readData()
  const body = req.body
  const { error } = taskScheme.validate(body);
  if (error) {
    res.status(400).send(error.details[0].message)
  } else {
    const newTask = {
      id: data.task.length + 1,
      ...body
    }
    data.task.push(newTask)
    writeData(data)
    res.status(201).send(newTask)
  }
})

app.put("/task/:id", (req, res) => {
  const data = readData()
  const body = req.body
  const { error } = taskEditScheme.validate(body);
  if (error) {
    res.status(400).send(error.details[0].message)
  }else {
    const id = parseInt(req.params.id)
    const taskIndex = data.task.findIndex((task) => task.id === id)
    data.task[taskIndex] = {
      ...data.task[taskIndex],
      ...body
    }
    writeData(data)
    res.status(200).send(data.task[taskIndex])
  }
})

app.listen(3000, () => console.log("Server listening on port 3000"))