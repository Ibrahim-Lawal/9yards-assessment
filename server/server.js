const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Task = require('./models/Task')

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp'

app.use(cors())
app.use(express.json())

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' })
  }
})

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required' })
  }

  try {
    const task = new Task({ title: title.trim() })
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: 'Failed to save task' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
