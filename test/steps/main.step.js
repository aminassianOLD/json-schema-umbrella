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

    var English = require('yadda').localisation.English;
    var umbrella = require('../../lib/main');
    var expect = require('chai').expect;
    var JaySchema = require('jayschema');
    var jaySchema = new JaySchema();

    var outAnalyseFilePath = __dirname + '/../../schema/analyse.out.schema.json';
    var outAnalyse = require(outAnalyseFilePath);
    var inAnalyseFilePath = __dirname + '/../../schema/analyse.in.schema.json';
    var inAnalyse = require(inAnalyseFilePath);

    var callResult, options, result, eot, eotToJson, strToEval, jayresult;

    module.exports = (function() {
        return English.library()
            .given("new options {}", function(next) {
                options = {};
                next();
            })
            .define("(?:and|with) options.schema = <<<EOT", function(next) {
                strToEval = 'options.schema = eotToJson;';
                eot = [];
                next();
            })
            .define("(?:and|with) options.options = <<<EOT", function(next) {
                strToEval = 'options.options = eotToJson;';
                eot = [];
                next();
            })
            .define("Then umbrella.analyse return <<<EOT", function(next) {
                strToEval = 'expect(result).deep.equal(eotToJson);';
                eot = [];
                next();
            })
            .define("EOT;", function(next) {
                try {
                    eotToJson = JSON.parse(eot.join("\n"));
                    eval(strToEval); // evil but good :-)
                    next();
                } catch (e) {
                    next(e);
                }
            })
            .define("and analyse.out.schema.json validate result", function(next) {
                jayresult = jaySchema.validate(eotToJson, outAnalyse);
                if (jayresult.length !== 0) {
                    error = new Error("out.analyse");
                    error.schemaFilePath = outAnalyseFilePath;
                    error.jaySchema = jayresult;
                    next(error);
                } else {
                    next();
                }
            })
            .define("and analyse.in.schema.json validate options", function(next) {
                jayresult = jaySchema.validate(options, inAnalyse);
                if (jayresult.length !== 0) {
                    error = new Error("in.analyse");
                    error.schemaFilePath = outAnalyseFilePath;
                    error.jaySchema = jayresult;
                    next(error);
                } else {
                    next();
                }
            })
            .when("i call umbrella.analyse with options", function(next) {
                result = umbrella.analyse(options);
                next();
            })
            .when("i call umbrella.analyse without options", function(next) {
                result = umbrella.analyse();
                next();
            })
            .define("(.*)", function(str, next) {
                eot.push(str)
                next();
            })
    })();

}());