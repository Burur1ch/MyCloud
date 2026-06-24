const path = require('path')
const fs = require('fs')
const User = require('../Model/User')
const File = require('../Model/File')
const fileService = require('../services/fileService')

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = path.join(parentFile.path, file.name)
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.error(e)
            return res.status(400).json({message: e.message || 'Error creating directory'})
        }
    }

    async getFiles(req, res) {
        try {
            const {sort} = req.query
            const sortMap = {name: {name: 1}, type: {type: 1}, date: {date: 1}, size: {size: 1}}
            const sortOption = sortMap[sort] || {}
            const files = await File.find({user: req.user.id, parent: req.query.parent || null}).sort(sortOption)
            return res.json(files)
        } catch (e) {
            console.error(e)
            return res.status(500).json({message: 'Cannot get files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'Not enough disk space'})
            }

            user.usedSpace += file.size

            const filePath = parent
                ? path.join(process.env.FILE_PATH, String(user._id), parent.path, file.name)
                : path.join(process.env.FILE_PATH, String(user._id), file.name)

            if (fs.existsSync(filePath)) {
                return res.status(400).json({message: 'File already exists'})
            }

            await file.mv(filePath)

            const type = file.name.split('.').pop()
            const dbFilePath = parent ? path.join(parent.path, file.name) : file.name

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: dbFilePath,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            return res.json(dbFile)
        } catch (e) {
            console.error(e)
            return res.status(500).json({message: 'Upload error'})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(404).json({message: 'File not found'})
            }
            const filePath = path.join(process.env.FILE_PATH, String(req.user.id), file.path)
            if (fs.existsSync(filePath)) {
                return res.download(filePath, file.name)
            }
            return res.status(400).json({message: 'Download error'})
        } catch (e) {
            console.error(e)
            return res.status(500).json({message: 'Download error'})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(404).json({message: 'File not found'})
            }
            fileService.deleteFile(file)
            await File.deleteOne({_id: file._id})
            return res.json({message: 'File was deleted'})
        } catch (e) {
            console.error(e)
            return res.status(400).json({message: 'Delete error'})
        }
    }

    async searchFile(req, res) {
        try {
            const searchName = req.query.search
            const files = await File.find({user: req.user.id})
            const result = files.filter(file => file.name.includes(searchName))
            return res.json(result)
        } catch (e) {
            console.error(e)
            return res.status(400).json({message: 'Search error'})
        }
    }
}

module.exports = new FileController()
