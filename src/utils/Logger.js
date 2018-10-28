import winston from 'winston'

export default class Logger {

    /**
     * constructor - New logger object
     *
     * @param  {string} level                    logging level
     * @param  {string} [filename]        path to logging readFile
     */
    constructor( level, filename = null ) {
        this.level = level
        this.filename = filename
        this.logger = this._createLogger( level, filename )
    }

    /**
     * isFileTransport - check if file path is given
     *
     * @return {boolean} true if filename is given, false otherwise
     */
    _isFileTransport( ) {
        return !!this.filename
    }

    /**
     * createTransport - create transports array for winston configuration
     *
     * @param  {strinh} filenam        path to file
     * @return {Object[]}                    transports array
     */
    _createTransport() {
        const transport = []
        transport.push( new winston.transports.Console() )
        if ( this._isFileTransport( this.filename ) ) {
            transport.push( new winston.transports.File( { filename: this.filename } ) )
        }
        return transport
    }

    /**
     * createLogger - create new logger instance
     *
     * @param  {string} level         logging name
     * @param  {string} filename     path to file
     * @return {Object}              logger instance
     */
    _createLogger( level, filename ) {
        return winston.createLogger( { transports: this._createTransport( filename ),
            level,
            format: winston.format.simple() } )
    }

    /**
     * log - log message
     *
     * @param  {string} message    message to log
     * @return {undefined}
     */
    log( message ) {
        this.logger.log( this.level, message )
    }

}
