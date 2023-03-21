const { dir } = require('console')
const fs = require('fs')
const http = require('http')
const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/html"
    })
    if (request.url == "/") {
        const home = fs.readFileSync(__dirname + "/home.html", "utf-8")
        response.write(home)

    }
    response.end()
})
server.listen(8000, () => {
    console.log('Server running at port 8000')
})