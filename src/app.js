import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use( cors() )
app.use( compression() )
app.use( morgan( 'dev' ) )
app.use( express.json() )
app.use( express.urlencoded( { extended: false } ) )

export default app
