import { readFileSync, statSync, writeFileSync } from 'fs'

const readme = readFileSync('README.md', 'utf8')

try {
  const existReadme = statSync('documents/README.md')
  if (existReadme.isFile()) {
    writeFileSync('documents/README.md', readme, 'utf8')
  }
} catch (err) {
  console.log(err)
}


