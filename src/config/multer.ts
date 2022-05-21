/* eslint-disable no-undef */
import path from 'path'
import multer from 'multer'
import fs from 'fs'
import crypto from 'crypto'
import { extension } from 'mime-types'

const destination: string = path.basename(process.env.UPLOAD_PATH as string)

const limits = {
  fileExtensions: process.env.UPLOAD_ALLOWED_TYPES?.split(',') as string[],
  fileSize: Number(process.env.UPLOAD_MAX_SIZE),
  files: Number(process.env.UPLOAD_MAX_FILES)
}

const storage = multer.diskStorage({
  destination: (_req, file, callBack) => {
    if (!fs.existsSync(destination)) fs.mkdirSync(destination)
    callBack(null, destination)
  },
  filename: (_req, file, callBack) => {
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

console.info('-------------------------------------')
console.info(`Upload max size: [${limits.fileSize} KB]`)
console.info(`Upload max files: [${limits.files}]`)
console.info(`Upload allowed types: [${limits.fileExtensions}]`)
console.info('-------------------------------------')

export default {
  destination,
  limits,
  storage,
  fileFilter
}
