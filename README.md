[![npm package version][badge-image-npm-package-version]][badge-url-npm-package-version][![npm package count download][badge-image-npm-package-count-download]][badge-url-npm-package-count-download][![travis status][badge-image-travis-build]][badge-url-travis-build][![coveralls status][badge-image-coveralls]][badge-url-coveralls]

![json-schema-umbrella][icon-image64x64] json-schema-umbrella v0.1.0-beta.3
=================================================

Introduction
------------------------------------------

Analysis json-schema v4 and triggers warnings in the following case:

- unemployed required property
- required property without default.

![video][video-image]
[video-image]: https://raw.githubusercontent.com/aminassian/json-schema-umbrella/master/img/module.gif

Installation
------------------------------------------

This package is available on [npm](https://www.npmjs.com/package/json-schema-umbrella) as: ``json-schema-umbrella``

```bash
$ npm install json-schema-umbrella -g
$ npm install json-schema-umbrella --save
```

Cli
------------------------------------------

```bash
$ json-schema-umbrella --help
$ json-schema-umbrella --version
$ json-schema-umbrella --schema path/to/your.schema.json
$ json-schema-umbrella --schema path/to/your.schema.json > result.json
$ json-schema-umbrella --pretty --schema path/to/your.schema.json
$ json-schema-umbrella --pretty --schema path/to/your.schema.json > result.json
```

Usage
------------------------------------------

readme.usage.schema

```js
var umbrella = require('json-schema-umbrella');
var yourSchema = { //
    "properties": {
        "a" : {
            "type" : "string",
        }
    },
    "required" : [
        "b", // <=== "b" property not exist
        "a" // <=== "a" property exist but without 'default' property
    ]
}
var cautions = umbrella.analyse({"schema": yourSchema});
```

readme.usage.schema

```js
{
    "analyse": [
        {
            "code": "UNEMPLOYED_REQUIRED",
            "message": "unemployed 'b' required",
            "path": "/required"
        },
        {
            "code": "MISSING_REQUIRED_DEFAULT",
            "message": "'a' required as no default",
            "path": "/required"
        }
    ],
    "licence": "GPL-3.0",
    "donate": [
        "https://pledgie.com/campaigns/27813",
        "https://gratipay.com/aminassian"
    ]
}
```


Test
------------------------------------------

To run the test suite, download the source code, install the dependencies and run `npm test`.

```bash
$ git clone https://github.com/aminassian/json-schema-umbrella.git
$ cd json-schema-umbrella
$ npm install
$ npm test
```



Coverage : https://aminassian.github.io/json-schema-umbrella/coverage/index.html

Made by
------------------------------------------

The original author of json-schema-umbrella is  [Alban Minassian](https://github.com/aminassian).

If you like json-schema-umbrella and would like to support it, you are welcome to make a donation. It will surely be appreciated! Thanks!

[![donate with your pledgie account][donate-image-pledgie]][donate-url-pledgie][![donate with your gratipay account][donate-image-gratipay]][donate-url-gratipay]

License
------------------------------------------

[GPL-3.0](https://github.com/aminassian/json-schema-umbrella/blob/master/LICENSE)

Logo : umbrella from [Font-Awesome](http://fortawesome.github.io/Font-Awesome/) (licence [SIL OFL 1.1](http://scripts.sil.org/OFL))

External libraries :

- [underscore.js](http://underscorejs.org/) ([licence](https://github.com/jashkenas/underscore/blob/master/LICENSE))
- [js-traverse](https://github.com/substack/js-traverse) ([licence](https://github.com/substack/js-traverse/blob/master/LICENSE))
- [Commander.js](https://github.com/tj/commander.js) ([licence](https://github.com/tj/commander.js))


Links
------------------------------------------

- www : https://aminassian.github.io/json-schema-umbrella
- www [fr] : https://aminassian.github.io/json-schema-umbrella/index.fr.html
- coverage : https://aminassian.github.io/json-schema-umbrella/coverage/index.html
- doc api : https://aminassian.github.io/json-schema-umbrella/api/index.html
- github : https://github.com/aminassian/json-schema-umbrella
- issues : https://github.com/aminassian/json-schema-umbrella/issues
- npm : https://www.npmjs.com/package/json-schema-umbrella
- pledgie : https://pledgie.com/campaigns/27813 [donate]
- gratipay : https://gratipay.com/aminassian [donate]

Release Notes
------------------------------------------

- 0.1.0-beta.1 (2015/01/11):
    - ``init`` This is the first beta public of json-schema-umbrella
- 0.1.0-beta.2 (2015/01/11):
    - ``update`` fix npm cli error, add missing dot file and fix www url
- 0.1.0-beta.3 (2015/01/11):
    - ``update`` fix missing jayschema package

------------------------------------------

Copyright © 2015 - Proudly Made In Nantes [![nantestech][nantestech-image]][nantestech-url]
[nantestech-image]: https://raw.githubusercontent.com/aminassian/json-schema-umbrella/master/img/NANTES-TECH-LOGO-NOIR-HOR.png
[nantestech-url]: http://www.nantestech.com


[icon-image32x32]: https://raw.githubusercontent.com/aminassian/json-schema-umbrella/master/img/umbrella_000000_32.png
[icon-image64x64]: https://raw.githubusercontent.com/aminassian/json-schema-umbrella/master/img/umbrella_000000_64.png
[donate-image-pledgie]: https://raw.githubusercontent.com/aminassian/json-schema-umbrella/master/img/pledgie32x32.png
[donate-url-pledgie]: https://pledgie.com/campaigns/27813
[donate-image-gratipay]: https://raw.githubusercontent.com/aminassian/json-schema-umbrella/master/img/gratipay32x32.png
[donate-url-gratipay]: https://gratipay.com/aminassian
[badge-image-npm-package-version]: https://img.shields.io/npm/v/json-schema-umbrella.svg?style=flat
[badge-url-npm-package-version]: https://npmjs.org/package/json-schema-umbrella
[badge-image-npm-package-count-download]: https://img.shields.io/npm/dm/json-schema-umbrella.svg?style=flat
[badge-url-npm-package-count-download]: https://npmjs.org/package/json-schema-umbrella
[badge-image-travis-build]: https://img.shields.io/travis/aminassian/json-schema-umbrella.svg?style=flat
[badge-url-travis-build]: https://travis-ci.org/aminassian/json-schema-umbrella
[badge-image-coveralls]: https://img.shields.io/coveralls/aminassian/json-schema-umbrella.svg?style=flat
[badge-url-coveralls]: https://coveralls.io/r/aminassian/json-schema-umbrella?branch=master