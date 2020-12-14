const yargs = require('yargs/yargs')(process.argv)
const fetch = require('node-fetch')
const chalk = require('chalk')
const fs = require('fs')
const validator = require('validator')

// Chalk utils
const errorChalk = (text) => {
    return chalk.bgRed.white.bold(" " + text + " ")
}

const okChalk = (text) => {
    return chalk.bgGreen.bold.white(" " + text + " ")
}

const verifyChalk = (text) => {
    return chalk.bgRed.white.bold.inverse(" " + text + " ")
}

// Parsing Arguments passed in Command Line
const { file, codes, url } = yargs.array('codes').string('url').string('file').argv

// CLI input validation
if (!validator.isURL(url, { require_protocol: true })) {
    console.log(errorChalk(url) + "is NOT VALID! Please mention protocol also {https://} !")
    process.exit()
}

if (!file.endsWith('.txt')) {
    console.log(errorChalk(file) + "should end in .txt !")
    process.exit()
}

if (!fs.existsSync(__dirname + "\\" + file)) {
    console.log("File" + errorChalk(file) + "doesn't exists !")
    process.exit()
}

codes.forEach(code => {
    if (code !== parseInt(code, 10)) {
        console.log(errorChalk(code) + "is not integer. Codes should be integer")
        process.exit()
    }
})

// Verified
console.log(verifyChalk("Sending Requests"))

var result = {}
codes.forEach(code => result[code] = [])
var requestPromises = []
var totalSuccessfulRequest = 0
var totalRequest = 0

const fetchData = (path) => {
    const urlPath = url + '/' + path
    return new Promise((resolve, _) => {
        fetch(urlPath).then(({ status }) => {
                if (result[status] != undefined) {
                    result[status].push(urlPath)
                }
                totalSuccessfulRequest += 1
                resolve({ status, urlPath })
            })
            .catch(({ message }) => {
                console.log(errorChalk("Error -> " + urlPath))
                resolve({ message, urlPath })
            })
    })
}

// Line Reader to read file data
const lineReader = require('readline').createInterface({
    input: fs.createReadStream(file)
})

lineReader.on('line', function(line) {
        totalRequest += 1
        requestPromises.push(fetchData(line))
    })
    .on('close', function() {
        Promise.all(requestPromises).then(_ => {
            console.log("********************")
            console.log(errorChalk("Unsuccessful Request: " + (totalRequest - totalSuccessfulRequest)))
            console.log(okChalk("Total Successful Request: " + totalSuccessfulRequest))
            console.log("Final result:")
            console.log(result)
        })
    })