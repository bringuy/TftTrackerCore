const upload = require('../screenshot/upload')
const analyzeImage = require('../screenshot/analyzeImage')

const screenshot = () => {
    try {
        upload()
        analyzeImage()
        return { message: "successful screenshot" }
    }
    catch {
        return { message: "screenshot was not successful" }
    }
}

module.exports = {
    screenshot
}