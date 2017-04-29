#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const icongen = require('icon-gen')
const argv = require('minimist')(process.argv.slice(2))

// get values from command line arguments
const presentation_data = require('./' + path.relative(__dirname, argv._[0]))
const outputDir = argv._[1]

// load the template strings into runtime
const page = fs.readFileSync(`${__dirname}/compile/index.html.handlebars`, { encoding: "utf8" })
const icon = fs.readFileSync(`${__dirname}/compile/favicon.svg.handlebars`, { encoding: "utf8" })

// create the templates
const page_template = handlebars.compile(page)
const icon_template = handlebars.compile(icon)

// create the directory to place the files into
if (!fs.existsSync(path.join(outputDir, '/presentation'))) {
  fs.mkdirSync(path.join(outputDir, '/presentation'))
}
if (!fs.existsSync(path.join(outputDir, '/presentation/css'))) {
  fs.mkdirSync(path.join(outputDir, '/presentation/css'))
}

// create the html file
fs.writeFileSync(path.join(process.cwd(), outputDir, '/presentation/index.html'), page_template(presentation_data))

// create the icon file
fs.writeFileSync(path.join(__dirname, '/compile/favicon.svg'), icon_template(presentation_data))

icongen(path.join(__dirname, '/compile/favicon.svg'), path.join(process.cwd(), outputDir, '/presentation'), {
  modes: ['ico'],
  names: {
    ico: 'favicon'
  }
})

// copy over the bundle.js
const bundle = fs.readFileSync(path.join(__dirname, '/bundle.js'))
fs.writeFileSync(path.join(process.cwd(), outputDir, '/presentation/bundle.js'), bundle)

// copy over css files
const baseCss = fs.readFileSync(path.join(__dirname, '/css/base.css'))
const customCss = fs.readFileSync(path.join(__dirname, '/css/custom.css'))
const themeCss = fs.readFileSync(path.join(__dirname, '/css/default.theme.css'))
fs.writeFileSync(path.join(process.cwd(), outputDir, '/presentation/css/base.css'), baseCss)
fs.writeFileSync(path.join(process.cwd(), outputDir, '/presentation/css/custom.css'), customCss)
fs.writeFileSync(path.join(process.cwd(), outputDir, '/presentation/css/default.theme.css'), themeCss)