import mongoose from 'mongoose'
import Logger from './utils/Logger'

const CONFIG = require( './config/config' )
const database = {}

database.connect = () => {
    const infoLogger = new Logger( 'info' )
    const errorLogger = new Logger( 'error', 'error.log' )

    mongoose.connect( CONFIG.db_uri, {
        useNewUrlParser: true,
        useCreateIndex: true
    } )

    const db = mongoose.connection
    db.on( 'error', ( err ) => {
        errorLogger.log( 'Database connection error' )
        errorLogger.log( `${err}` )
    } )
    db.once( 'open', () => {
        infoLogger.log( 'Database succesfully connected' )
    } )
    return db
}

database.disconnect = () => {
    mongoose.connection.close()
}

module.exports = database
