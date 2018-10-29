import express from 'express'
import passport from 'passport'

import UserController from '../controllers/UserController'

const router = express.Router()// eslint-disable-line new-cap

import middleware from '../middleware/passport'
middleware( passport )

const requireAuth = passport.authenticate( 'jwt', {
    session: false
} )

router.get( '/', ( req, res ) => {
    res.json( {
        status: 'success',
        message: 'Parcel Pending API',
        data: {
            version_number: 'v0.0.1'
        }
    } )
} )

router.get( '/test', requireAuth, ( req, res ) => {
    res.json( {
        status: 'success',
        message: 'Test Auth API',
        data: {
            version_number: 'v0.0.1'
        }
    } )
} )

// router.post(    '/users',           UserController.create )             // C
// router.get(     '/users',           requireAuth, UserController.get )   // R
// router.put(     '/users',           requireAuth, UserController.get )   // U
// router.delete(  '/users',           requireAuth, UserController.get )   // D
router.post(    '/users/login',     UserController.login )

export default router
