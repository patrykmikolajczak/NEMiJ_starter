import '@babel/polyfill'
import db from './db'
import app from './app'

const CONFIG = require( './config/config' )

db.connect()
app.listen( CONFIG.port, () => {
    console.log( 'App started' )// eslint-disable-line
} )
