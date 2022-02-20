const shell = require('shelljs')

shell.rm('-rf', './lib')
shell.exec('npx tsc -p tsconfig.lib.json')
shell.cp('-r', './src', './lib/')
