import { ExtractJwt, Strategy } from 'passport-jwt'
import UserModel from '../models/UserModel'
import CONFIG from '../config/config'

export default ( passport ) => {
    const options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    options.secretOrKey = CONFIG.jwt_encryption

    passport.use( new Strategy( options, async( jwt_payload, done ) => {
        let err = null, user = null;
        [ err, user ] = await UserModel.findById( jwt_payload.user_id )

        if ( err ) {
            return done( err, false )
        }

        if ( user ) {
            return done( null, user )
        } else {
            return done( null, false )
        }

    } ) )
}