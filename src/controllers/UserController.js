require ( '@babel/polyfill' )
import UserModel from '../models/UserModel'
import Logger from '../utils/Logger'
import validator from 'validator'

const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.log' )

const controller = {

    create: async( req, res ) => {
        return res.json( { success: false } )
    },

    get: async( req, res ) => {
        return res.json( { success: false } )
    },

    update: async( req, res ) => {
        return res.json( { success: false } )
    },

    remove: async( req, res ) => {
        return res.json( { success: false } )
    },

    login: async( req, res ) => {
        infoLogger.log( req.body.email )
        const body = req.body

        let user = null
        infoLogger.log( validator.isEmail( body.email ) )

        if ( validator.isEmail( body.email ) ){

            user = await UserModel.findOne( { email: body.email } )

            if ( !user ) {
                return res.json( { success: false, message: 'User does not exist.' } )
            }

            // user = await user.comperPassword( body.password )

            // if ( !user ) {
            //     return res.json( { success: false, message: 'Wrong password.' } )
            // }

            return res.json( { token: user.getJWT() } )
            // return res.json( { success: true } )

        }
    }

}

export default controller
