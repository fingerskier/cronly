/**
 * aggregate of all api handlers
 */

import users from './users.js'
import cron from './cron.js'
import scripts from './scripts.js'
import auth from './auth.js'

export default { users, cron, scripts, auth }