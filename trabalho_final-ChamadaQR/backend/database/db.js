require("dotenv").config()

const host_pg = process.env.HOST
const user_pg = process.env.USER
const password_pg = process.env.PASS
const database_pg = process.env.DATABASE

const knex = require("knex")({
    client : "postgres",
    connection : {
        host : host_pg,
        user : user_pg,
        password : password_pg,
        database : database_pg
    }
})

module.exports = knex