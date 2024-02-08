import fs from 'fs'

export const chooseRandom = () => {
  // TODO implement chooseRandom
}

export const createPrompt = () => {
  // TODO implement createPrompt
}

export const createQuestions = () => {
  // TODO implement createQuestions
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
