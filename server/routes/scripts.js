import fs from 'fs/promises'
import path from 'path'
import express from 'express'

const router = express.Router()

/**
 * List scripts in a directory
 */
async function listScripts(directory) {
  const scripts = [];
  
  // create directory if it doesn't exist
  await fs.mkdir(directory, { recursive: true })
  
  const files = await fs.readdir(directory);
  
  for (const file of files) {
    if (file.endsWith('.js')) {
      const stats = await fs.stat(path.join(directory, file));
      scripts.push({
        name: file,
        path: path.join(directory, file),
        size: stats.size,
        modified: stats.mtime
      });
    }
  }
  
  return scripts;
}

/**
 * Get all scripts
 */
router.get('/', async (req, res) => {
  try {
    const scriptsDir = path.resolve(process.cwd(), 'scripts'); // or wherever scripts are stored
    const scripts = await listScripts(scriptsDir);
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

/**
 * Run a script
 */
router.put('/:script', async (req, res) => {
  const script = req.params.script
  const scriptPath = path.resolve(process.cwd(), 'scripts', script)
  const result = await exec(scriptPath)
  res.json(result)
})

/**
 * Create a script
 */
router.post('/', async (req, res) => {
  const script = req.body.script
  const scriptPath = path.resolve(process.cwd(), 'scripts', script)
  const result = await exec(scriptPath)
  res.json(result)
})


export default router