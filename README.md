## Simple Web Presentation

**Quickly create simple web presentations.**

_Simplifies the process to just writing a few lines of YAML/JSON. Responsive design makes your presentation look good on small and large screens. Automatic favicon creation based on presentation background._

![Demo Image](demo_image.png)

**Getting Started**

To start creating a presentation, you can install and run `simple-web-presentation` in your own project

```
npm install --save-dev thurt/simple-web-presentation
```

then create your own `presentation-data.yaml` or `presentation-data.json` file and compile the code like so

```
./node_modules/.bin/simple-web-presentation presentation-data.yaml output/
```

You may prefer to create an npm script to execute this command, like

```
"script": {
    "compile": "simple-web-presentation presentation-data.yaml output/"
}
```

**Presentation Data Guidelines**

Inside `presentation-data.json`, you **must** specify:

* `author` - your name
* `description` - a short description about the contents of your presentation
* `title` - the presentation's title
* `theme` - filepath or uri to css file
* `bg-start-color` & `bg-end-color` - should be hex color codes. They specify what colors will be used for the presentation's background and for the auto-generated favicon.
* `slides` - should be an array of slide objects

Inside each slide object, you may **optionally** specify:

* `heading` - text
* `sub-heading` text
* `img` - filepath or uri to an image file
* `img-caption` - text description for the image
* `contents` - an array of content objects

Each content object should contain only one key-value pair.

```
// Examples
content: [
  { "p": "This content object will become a paragraph element with this text inside."},
  { "h3": "This content object will become a heading element with this text inside."},
  { "ul": [
    "This content object will become an unordered list element",
    "Here is a second list item"
  ] }
]
```

Usually, `p` will be the most common key used for your content objects.

The only special case is when the key is `ul` or `ol`--in that case the value must be an array of strings (see example above).

**Themes**

`default.theme.css` is the only available theme right now.

**Extra Tips**

Use http://uigradients.com to help you choose background colors that fits your presentation.
