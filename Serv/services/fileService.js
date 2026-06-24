const fs = require('fs')
const path = require('path')

class FileService {
    getPath(file) {
        return path.join(process.env.FILE_PATH, String(file.user), file.path)
    }

    createDir(file) {
        const filePath = path.join(process.env.FILE_PATH, String(file.user), file.path)
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true})
                    return resolve({message: 'Directory was created'})
                } else {
                    return reject({message: 'Directory already exists'})
                }
            } catch (e) {
                return reject({message: 'File system error'})
            }
        })
    }

    deleteFile(file) {
        const filePath = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmSync(filePath, {recursive: true, force: true})
        } else {
            fs.unlinkSync(filePath)
        }
    }
}

module.exports = new FileService()
