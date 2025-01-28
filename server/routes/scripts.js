import fs from 'fs/promises'
import path from 'path'
import express from 'express'

const router = express.Router()

/**
 * List scripts in a directory
 */
async function listScripts(directory) {
  const scripts = [];
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
router.get('/scripts', async (req, res) => {
  try {
    const scriptsDir = path.resolve(process.cwd(), 'scripts'); // or wherever scripts are stored
    const scripts = await listScripts(scriptsDir);
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


export default router