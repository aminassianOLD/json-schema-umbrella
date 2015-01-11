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

/**
 * json-schema-umbrella
 * @module json-schema-umbrella
 */

/**
 * @file json-schema-umbrella main file
 * @author Alban Minassian
 * @version 0.1.0-beta.3
 * @license GPL-3.0
 */

(function() {

    "use strict";

    var traverse = require('traverse');
    var _ = require('underscore');

    /**
     * analyse
     *
     * @param {Object} options - options
     * @return {Array} array of warnings
     */
    module.exports.analyse = function(options) {

        // var
        var schemaJson = {},
            _options = {},
            analyse = [],
            diff = [],
            kexist = [],
            listPropertiesKey = [],
            result = {analyse: [], licence: "GPL-3.0", donate: ["https://pledgie.com/campaigns/27813", "https://gratipay.com/aminassian"]};

        // options
        if (typeof options !== 'undefined') {
            if (options.hasOwnProperty('schema')) {
                schemaJson = options.schema;
            }
            if (options.hasOwnProperty('options')) {
                _options = options.options;
            }
        }

        // traverse
        traverse(schemaJson).forEach(function(value, x) {
            if (this.key === "required") {
                var listRequired = value;
                // get sibling "properties"
                var siblingKeys = this.parent.keys; // return [ 'type', 'additionalProperties', 'properties', 'required' ]
                if (siblingKeys.indexOf("properties") === -1) {
                    // without sibling key "properties"
                    _.each(listRequired, function(keyRequired) {
                        analyse.push({
                            "code" : "UNEMPLOYED_REQUIRED",
                            "message" : "unemployed '" + keyRequired + "' required",
                            "path": '/' + (this.path).join("/")
                        });
                    }, this);
                } else {
                    // with sibling key "properties"
                    // get keys inside "properties"
                    var pathToProperties = _.clone(this.path);
                    pathToProperties.pop("required");
                    pathToProperties.push("properties");
                    var subJson = schemaJson;
                    _.each(pathToProperties, function(nodeName) {
                        subJson = subJson[nodeName];
                    });
                    listPropertiesKey = Object.keys(subJson); // console.log(listPropertiesKey)
                    // test if all "required" are present in properties.keys
                    diff = _.difference(listRequired, listPropertiesKey);
                    if (diff.length > 0) {
                        _.each(diff, function(keyRequired) {
                            analyse.push({
                                "code" : "UNEMPLOYED_REQUIRED",
                                "message" : "unemployed '" + keyRequired + "' required",
                                "path": '/' + (this.path).join("/")
                            });
                        }, this);
                    }
                    // test if existing required as default value
                    kexist = _.difference(listRequired, diff);
                    if (kexist.length > 0) {
                        _.each(kexist, function(keyRequired) {
                            if (!subJson[keyRequired].hasOwnProperty("default")) {
                                analyse.push({
                                    "code" : "MISSING_REQUIRED_DEFAULT",
                                    "message" : "'" + keyRequired + "' required as no default",
                                    "path": '/' + (this.path).join("/")
                                });
                            }
                        }, this);
                    }
                }
            }
        });

        // return
        result.analyse = analyse;
        return result;
    };

}());