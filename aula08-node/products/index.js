const http = require("http")
const mysql = require("mysql")

const hostname = "localhost"
const port = 3000

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "store"
})

const server = http.createServer((req, res)=>{
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    sql = "SELECT * FROM product ORDER BY name"
    console.log(conn.state)
    if (conn.state != "authenticated") {
        try {
            conn.connect(function(error){
                if (error) {
                    res.end('{ "response" : "Connection Error" }')
                }
            })
        } catch(error) {
            res.end('{ "response" : "Connection Error" }')
        }
    }
    try {
        conn.query(sql, function (err, result, fields) {
            if (err) {
                res.end('{ "response" : "Query Error" }')
            } else {
                res.end(JSON.stringify(result))
            }
        })
    } catch(error) {
        res.end('{ "response" : "'+ error +'" }')
    }
})
    
server.listen(port, hostname, () => {
    console.log(`Server on air in: http://${hostname}:${port}`)
})