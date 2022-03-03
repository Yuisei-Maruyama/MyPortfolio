import { readFileSync } from 'fs'

const readme = readFileSync('README.md', 'utf8')

console.log(readme)
