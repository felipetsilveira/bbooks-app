const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

let instance = null

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if(err) {
        console.log(err)
    } else {
        //console.log('Houve conexao em ' + connection.state)
    }
})

class DbConn {
    static getDbConnInst() {
        return instance ? instance : new DbConn()
    }

    async getData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM books;"
                connection.query(query, (err, result) => {
                    if(err) {
                        reject(new Error(err.message))
                    } else {
                        resolve(result)
                    }
                })
            })

            return response

        } catch(err) {
            console.log(err)
        }
    }

    async insertBookData(isbn, title, subtitle, summary, price) {
        try {
            const insertD = await new Promise((resolve, reject) => {
                const query = "INSERT INTO books (isbn, title, subtitle, summary, price) VALUES (?,?,?,?,?);"
                connection.query(query, [isbn, title, subtitle, summary, price], (err, result) => {
                    if(err) {
                        reject(new Error(err.message))
                    } else {
                        resolve(result.insertD)
                    }
                })
            })
            console.log(insertD)
            return insertD

        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = DbConn