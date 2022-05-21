import path from 'path'
import multer from 'multer'
import fs from 'fs'
import crypto from 'crypto'
import { extension } from 'mime-types'
import { Express } from 'express'

const destination: string = path.basename(String(process.env.UPLOAD_PATH))

const limits = {
  fileExtensions: String(process.env.UPLOAD_ALLOWED_TYPES).split(','),
  fileSize: Number(process.env.UPLOAD_MAX_SIZE),
  files: process.env.UPLOAD_MAX_FILES
}

const storage = multer.diskStorage({
  destination: (
    _req: any,
    _file: any,
    callBack: (arg0: null, arg1: string) => void
  ) => {
    if (!fs.existsSync(destination)) fs.mkdirSync(destination)
    callBack(null, destination)
  },
  filename: (
    _req: any,
    file: { mimetype: string },
    callBack: (arg0: null, arg1: string) => void
  ) => {
    const fileExtension = extension(file.mimetype)
    const fileName = crypto.randomBytes(18).toString('hex')
    callBack(null, `${fileName}.${fileExtension}`)
  }
})

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  callBack: multer.FileFilterCallback
): any => {
  const fileExtension = extension(file.mimetype)
  if (!limits.fileExtensions.includes(`${fileExtension}`)) {
    return callBack(new Error('Invalid file extension'))
  }
  callBack(null, true)
}

export default {
  limits,
  storage,
  fileFilter
}
