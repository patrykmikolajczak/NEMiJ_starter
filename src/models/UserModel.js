require ( '@babel/polyfill' )
const mongoose          = require( 'mongoose' )
const validate          = require( 'mongoose-validator' )
const CONFIG            = require( '../config/config' )
const jwt               = require( 'jsonwebtoken' )
const bcrypt            = require( 'bcrypt' )
// const Logger            = require( '../utils/Logger' )

// const errorLogger = new Logger( 'error', 'error.log' )

const Schema = mongoose.Schema
const UserSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [ validate( {
            validator: 'isEmail',
            message: 'Not a valid email.'
        } ) ],
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        index: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true } )

UserSchema.pre( 'save', async( next ) => {

    if ( this.isModified( 'password' ) || this.isNew ){

        let err = null, salt = null, hash = null;
        [ err, salt ] = await bcrypt.genSalt( 10 )
        if ( err ) {
            throw new Error( err.message )
        }

        [ err, hash ] = await bcrypt.hash( this.password, salt )
        if ( err ) {
            throw new Error( err.message )
        }

        this.password = hash

    } else {
        return next()
    }
} )

UserSchema.methods.comparePassword = async( pw ) => {
    let err = null, pass = null
    if ( !this.password ) {
        throw new Error( 'password not set' )
    }

    [ err, pass ] = await bcrypt.compare( pw, this.password )
    if ( err ) {
        throw new Error( err )
    }

    if ( !pass ) {
        throw new Error( 'invalid password' )
    }

    return this
}

UserSchema.methods.getJWT = function(){
    const expirationTime = parseInt( CONFIG.jwt_expiration )
    return `Bearer ${jwt.sign( { user_id: this._id }, CONFIG.jwt_encryption, { expiresIn: expirationTime } )}`
}

const User = module.exports = mongoose.model( 'User', UserSchema )// eslint-disable-line
