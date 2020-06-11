import * as mysql from 'mysql';

class ConnectionManager {
    constructor() {
        this.dbConfig: Object = dbConfig;
    }

    connect(): mysql.Connection {
        const connection = mysql.createConnection(this.dbConfig);
        connection.connect(err => {
            if (err) throw err;
            console.log('DB connected!');
        });
        return connection;
    }
}

export default ConnectionManager;