#!/usr/bin/env node
// -*- coding: utf-8 -*-

//
//    This file is part of json-schema-umbrella.
//
//    json-schema-umbrella is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    json-schema-umbrella is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with json-schema-umbrella.  If not, see <http://www.gnu.org/licenses/>
//

(function() {

    "use strict";

    var pretty;
    var fs = require('fs');
    var program = require('commander');

    program
        .version('0.1.0-beta.4')
        .option('-s, --schema [value]', 'file path to schema json v4')
        .option('-p, --pretty', 'pretty json', pretty, 0);

    program.on('--help', function() {
        console.log('  Example:');
        console.log('');
        console.log('    $ json-schema-umbrella --help');        console.log('    $ json-schema-umbrella --version');        console.log('    $ json-schema-umbrella --schema path/to/your.schema.json');        console.log('');
        console.log('  Links:');
        console.log('');
        console.log('    - www : http://aminassian.github.io/json-schema-umbrella');
        console.log('    - www [fr] : http://aminassian.github.io/json-schema-umbrella/index.fr.html');
        console.log('    - coverage : http://aminassian.github.io/json-schema-umbrella/coverage/index.html');
        console.log('    - doc api : http://aminassian.github.io/json-schema-umbrella/api/index.html');
        console.log('    - github : https://github.com/aminassian/json-schema-umbrella');
        console.log('    - issues : https://github.com/aminassian/json-schema-umbrella/issues');
        console.log('    - npm : https://www.npmjs.com/package/json-schema-umbrella');
        console.log('');
        console.log('  Donate:');
        console.log('');
        console.log('    * pledgie : https://pledgie.com/campaigns/27813');
        console.log('    * gratipay : https://gratipay.com/aminassian');
        console.log('');
    });

    program.parse(process.argv);

    //
    var str, schema;

    // test if file schema exist
    if (!fs.existsSync(program.schema)) {
        console.log("schema", program.schema, "not exist");
        process.exit(1);
    }

    // read file and parse to json
    str = fs.readFileSync(program.schema, 'utf8');
    try {
        schema = JSON.parse(str);
    } catch (e) {
        console.log("json parse error ", program.schema);
        console.log(e);
        process.exit(1);
    }

    // analyse schema
    var options = {"schema": schema};
    var umbrella = require("../lib/main");
    var result = umbrella.analyse(options);
    if (pretty === 0) {
        console.log(JSON.stringify(result, null, 0));
    } else {
        console.log(JSON.stringify(result, null, 4));
    }

    // exit code switch result
    if (result.length === 0) {
        process.exit(0);
    } else {
        process.exit(1);
    }

}());