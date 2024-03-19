const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST, 
    user: process.env.MYSQL_ADDON_USER, 
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = pool.promise()