const mongoose = require( 'mongoose' )
const validate = require( 'mongoose-validator' )
const CONFIG = require( '../config/config' )
const jwt = require( 'jsonwebtoken' )
// const bcrypt = require( 'bcrypt' )
const bcrypt = require( 'bcrypt-promise' )
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
        required: true
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

    try {
        if ( this.isModified( 'password' ) || this.isNew ){

            let salt = null, hash = null
            salt = await bcrypt.genSalt( 10 )

            hash = await bcrypt.hash( this.password, salt )

            this.password = hash

        } else {
            return next()
        }
    } catch ( err ) {
        throw new Error( err.message )
    }
} )

UserSchema.methods.comparePassword = async function( pw ) {
    try {
        let pass = null
        if ( !this.password ) {
            throw new Error( 'password not set' )
        }

        pass = await bcrypt.compare( pw, this.password )
        if ( !pass ) {
            throw new Error( 'invalid password' )
        }

        return this
    } catch ( err ) {
        throw new Error( err.message )
    }
}

UserSchema.methods.getJWT = function(){
    const expirationTime = parseInt( CONFIG.jwt_expiration )
    return `Bearer ${jwt.sign( { user_id: this._id }, CONFIG.jwt_encryption, { expiresIn: expirationTime } )}`
}

const User = module.exports = mongoose.model( 'User', UserSchema )// eslint-disable-line
