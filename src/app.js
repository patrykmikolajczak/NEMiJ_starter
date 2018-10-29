import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import v1 from './routes/v1'

const app = express()
app.use( helmet() )
app.use( cors() )
app.use( compression() )
app.use( morgan( 'dev' ) )
app.use( express.json() )
app.use( express.urlencoded( { extended: false } ) )

app.use( '/v1', v1 )

app.use( '/', ( req, res ) => {
    res.statusCode = 200 // send the appropriate status code
    res.json( { status: 'success', message: 'Mongo API', data: {} } )
} )

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
    const err = new Error( 'Not Found' )
    err.status = 404
    next( err )
} )

// error handler
app.use( ( err, req, res ) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {}

    // render the error page
    res.status( err.status || 500 )
    res.render( 'error' )
} )

export default app
