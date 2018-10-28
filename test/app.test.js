const supertest = require( 'supertest' )
const expect = require( 'chai' ).expect
const mongoose = require( 'mongoose' )
const router = require( '../src/app' ).default
const CONFIG = require( '../src/config/config' )

describe( 'loading express app', () => {
    const server = router.listen( 3030 )
    const request = supertest.agent( server )

    before( ( done ) => {
        mongoose.connect( CONFIG.db_uri, {
            useNewUrlParser: true
        } )
        const db = mongoose.connection
        db.on( 'error', () => {} )
        db.once( 'open', () => {
            done()
        } )
    } )

    after( ( done ) => {
        mongoose.connection.db.dropDatabase( () => {
            mongoose.connection.close()
            server.close( done )
        } )
    } )

    it( 'server exists', () => {
        expect( server ).to.exist
    } )

    it( 'should give 200 response from GET /', () => {
        return request.get( '/' )
            .expect( 200 )
    } )
} )
