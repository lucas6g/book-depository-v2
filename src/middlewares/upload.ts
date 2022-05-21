import multer from 'multer'
import fs from 'fs'
import multerConfig from '../config/multer'

export default {
  single: (key: string) => {
    return multer({
      storage: multerConfig.storage,
      limits: { fileSize: multerConfig.limits.fileSize },
      fileFilter: multerConfig.fileFilter
    }).single(key)
  },
  delete: (file: string) => {
    fs.unlinkSync(file)
  },
  deleteAll: (path: string) => {
    fs.readdirSync(path).forEach((file) => {
      fs.unlinkSync(`${path}/${file}`)
    })
    fs.rmdirSync(path)
  },
  deleteFolder: (folder: string) => {
    fs.rmdirSync(folder)
  }
}
