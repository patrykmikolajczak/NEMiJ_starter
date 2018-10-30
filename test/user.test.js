const supertest = require( 'supertest' )
// const expect = require( 'chai' ).expect
const mongoose = require( 'mongoose' )
const router = require( '../src/app' ).default
const CONFIG = require( '../src/config/config' )

describe( 'UserController & UserModel', () => {
    const server = router.listen( 3031 )
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

    it( 'should give 200 response from POST /v1/user/login', () => {
        return request.post( '/v1/user/login' )
            .send( { login: 'admin@admin.com', password: '12345' } )
            .expect( 200 )
    } )

} )
