# async-loader

A webpack loader for async source modification. Supports only Promises for now.

## Usage

`npm i async-loader`

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```js
var content = require('async?key=reportToServer!./file.txt');
// => returns what `config.reportToServer()` call resolves to
```

## Options

#### key (required)

The config key whose value is an async function with signature,

`function (source: string, loaderContext: Object): Promise`

## Example

```js
// webpack.config.js
module.exports = {
    uploadImage: function(imageJson) {
        var image = JSON.parse(imageJson);
        return new Promise(function(resolve, reject) {
            request.get(
                'www.example.com/api' + image.src,
                function(err, response, data) {
                    if (err) reject(err);
                    else resolve(data);
                }
            );
        });
    }
};

// js
var image = require('json!async?key=updloadImage!imagesize?json!./file.png');
```

## Why did I write this loader instead ?

We have something like `makeWebpackConfig` which takes in some params and returns a webpack config with plugins and loaders applied to projects of the same type which share most of the configuration. So this loader comes in handy where all you have to worry about is modifying source asynchronously and returning a Promise.
