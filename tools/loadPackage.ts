// import { readFileSync } from 'fs'
import packageJson from '../package.json'

// const dependencies = packageJson.dependencies
const devDependencies = packageJson.devDependencies

// console.log('dependencies', dependencies)
// console.log('devDependencies', devDependencies['@material-ui/core'])

for (const [key, value] of Object.entries(devDependencies)) {
  console.log(`${key}: ${value}`)
}
