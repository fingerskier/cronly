import cron from 'node-cron'

const activeCrons = new Map()

const cronService = {
  createJob(name, schedule, command) {
    if (activeCrons.has(name)) {
      throw new Error('CRON job already exists')
    }
    
    const job = cron.schedule(schedule, () => {
      // Execute command here
      console.log(`Executing CRON job: ${name}`)
      // You might want to use child_process.exec here to run actual commands
    })
    
    activeCrons.set(name, {
      schedule,
      command,
      job
    })
    
    return { name, schedule, command }
  },
  
  
  getAllJobs() {
    const jobs = []
    for (const [name, details] of activeCrons) {
      jobs.push({
        name,
        schedule: details.schedule,
        command: details.command
      })
    }
    return jobs
  },
  
  
  deleteJob(name) {
    const job = activeCrons.get(name)
    if (!job) {
      throw new Error('CRON job not found')
    }
    
    job.job.stop()
    activeCrons.delete(name)
    return { message: 'CRON job deleted' }
  }
}

export default cronService
