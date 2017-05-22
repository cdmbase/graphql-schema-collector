import * as fs from 'fs'
import * as glob from 'glob'

export interface ISchemaCallback {
  (err: Error, schema: any)
}

export interface ILoadSchemaFunc {
  (pattern: string, callback?: ISchemaCallback): Promise<any>
  sync?: Function
}

const loadSchema: ILoadSchemaFunc = (pattern: string, callback?: ISchemaCallback): Promise<any> => {
  return new Promise((resolve, reject) => {
    getGlob(pattern)
      .then((files) => makeSchema(files))
      .then((schema) => callback ? callback(null, schema) : resolve(schema))
      .catch((err) => callback ? callback(err, null) : reject(err))
  })
}

function makeSchema(fileNames: string[]): Promise<string> {
  const promises = fileNames.map(readFile)
  return Promise.all( promises ).then((fileContentArr: string[]) => {
    return fileContentArr.join()
  }).catch((err) => {
    throw err
  })
}


function getGlob(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (files.length === 0) {
        reject(Error(pattern) )
      } else {
        resolve(files)
      }
    })
  })
}

function readFile(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

loadSchema.sync = (pattern: string): any => {
  const fileNames = getGlobSync(pattern)
  const schema = makeSchemaSync(fileNames)
  return schema
}

function getGlobSync(pattern: string) {
  const fileNames = glob.sync(pattern)
  if (fileNames.length === 0) {
    throw Error(pattern)
  } else {
    return fileNames
  }
}

function makeSchemaSync(fileNames: string[]) {
  return fileNames.map(readFileSync).join()
}

function readFileSync(fileName: string): string {
  return fs.readFileSync(fileName, 'utf8')
}

export { loadSchema }
