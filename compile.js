#! /usr/bin/env node

require('better-require')('json yaml');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const icongen = require('icon-gen');
const argv = require('minimist')(process.argv.slice(2));

// get values from command line arguments
const presentation_data = require('./' + path.relative(__dirname, argv._[0]));
const outputDir = argv._[1];

// load the template strings into runtime
const page = fs.readFileSync(
  path.join(__dirname, '/templates/index.html.handlebars'),
  {encoding: 'utf8'},
);
const icon = fs.readFileSync(
  path.join(__dirname, '/templates/favicon.svg.handlebars'),
  {encoding: 'utf8'},
);

// create the templates
const page_template = handlebars.compile(page);
const icon_template = handlebars.compile(icon);

// create the directory to place the files into
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
if (!fs.existsSync(path.join(outputDir, '/css'))) {
  fs.mkdirSync(path.join(outputDir, '/css'));
}

// create the html file
console.log(presentation_data);
fs.writeFileSync(
  path.join(process.cwd(), outputDir, '/index.html'),
  page_template(presentation_data),
);

// create the icon file
fs.writeFileSync(
  path.join(__dirname, '/templates/favicon.svg'),
  icon_template(presentation_data),
);

icongen(
  path.join(__dirname, '/templates/favicon.svg'),
  path.join(process.cwd(), outputDir),
  {
    modes: ['ico'],
    names: {
      ico: 'favicon',
    },
  },
);

// copy over the bundle.js
const bundle = fs.readFileSync(path.join(__dirname, '/bundle.js'));
fs.writeFileSync(path.join(process.cwd(), outputDir, '/bundle.js'), bundle);

// copy over css files
const baseCss = fs.readFileSync(path.join(__dirname, '/css/base.css'));
const customCss = fs.readFileSync(path.join(__dirname, '/css/custom.css'));
const themeCss = fs.readFileSync(
  path.join(__dirname, '/css/default.theme.css'),
);
fs.writeFileSync(path.join(process.cwd(), outputDir, '/css/base.css'), baseCss);
fs.writeFileSync(
  path.join(process.cwd(), outputDir, '/css/custom.css'),
  customCss,
);
fs.writeFileSync(
  path.join(process.cwd(), outputDir, '/css/default.theme.css'),
  themeCss,
);

//cleanup
fs.unlink(path.join(__dirname, '/templates/favicon.svg'));
