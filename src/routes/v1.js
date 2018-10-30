import express from 'express'
import passport from 'passport'

import UserController from '../controllers/UserController'

import { catchAsync } from '../middleware/error'

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

// router.post(    '/users',           catchAsync( UserController.create ) )             // C
// router.get(     '/users',           requireAuth, catchAsync( UserController.get ) )   // R
// router.put(     '/users',           requireAuth, catchAsync( UserController.get ) )   // U
// router.delete(  '/users',           requireAuth, catchAsync( UserController.get ) )   // D
router.post(    '/users/login',     catchAsync( UserController.login ) )

export default router
