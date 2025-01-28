import express from 'express'
import cronService from '../services/cronService.js'

const router = express.Router()

// Get all CRON jobs
router.get('/', (req, res) => {
  try {
    const jobs = cronService.getAllJobs()
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new CRON job
router.post('/', (req, res) => {
  try {
    const { name, schedule, command } = req.body
    
    if (!name || !schedule || !command) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const job = cronService.createJob(name, schedule, command)
    res.status(201).json(job)
  } catch (error) {
    if (error.message === 'CRON job already exists') {
      res.status(409).json({ message: error.message })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

// Delete CRON job
router.delete('/:name', (req, res) => {
  try {
    const result = cronService.deleteJob(req.params.name)
    res.json(result)
  } catch (error) {
    if (error.message === 'CRON job not found') {
      res.status(404).json({ message: error.message })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

export default router
