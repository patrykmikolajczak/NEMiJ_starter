const db            = require( '../../lib/db' )
const fs            = require( 'fs' )
const path          = require( 'path' )
const modelsPath    = path.resolve( './lib/models' )

db.connect()

const removeExtensionFromFile = ( file ) => {
    return file
        .split( '.' )
        .slice( 0, -1 )
        .join( '.' )
        .toString()
}

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync( modelsPath ).filter( ( file ) => {
    return removeExtensionFromFile( file ) !== 'index'
} )

const deleteModelFromDB = ( model ) => {
    return new Promise( ( resolve, reject ) => {// eslint-disable-line
        model = require( `${modelsPath}/${model}` )
        model.deleteMany( {}, ( err, row ) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( row )
            }
        } )
    } )
}

const clean = async() => {
    try {
        const promiseArray = models.map(
            async( model ) => {
                await deleteModelFromDB( model )
            }
        )
        await Promise.all( promiseArray )
        console.log( 'Cleanup complete!' )// eslint-disable-line
        process.exit( 0 )
    } catch ( err ) {
        console.log( 'Error', err )// eslint-disable-line
        process.exit( 0 )
    }
}

clean()
