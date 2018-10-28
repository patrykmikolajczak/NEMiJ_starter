const { Seeder } = require( 'mongo-seeding' )
const CONFIG = require( '../config/config.js' )
const path = require( 'path' )

const dataPath = path.resolve( './lib/migrations/data' )
console.log( dataPath )// eslint-disable-line

const config = {
    database: CONFIG.db_uri,
    inputPath: dataPath,
    dropDatabase: false
}

const seeder = new Seeder( config )
// console.log( seeder )// eslint-disable-line
const collections = seeder.readCollectionsFromPath( dataPath )
// console.log( collections )// eslint-disable-line

const main = async() => {
    try {
      await seeder.import( collections )
      console.log( 'Seed complete!' )// eslint-disable-line
      process.exit( 0 )
    } catch ( err ) {
      console.log( err )// eslint-disable-line
      process.exit( 0 )
    }
}

main()
