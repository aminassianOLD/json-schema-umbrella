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

    var Yadda = require('yadda');
    Yadda.plugins.mocha.StepLevelPlugin.init();

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    // steps
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    var jsonRequiredUtilityStep = require(__dirname + '/steps/main.step');

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    // init yadda with steps
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    var yadda = new Yadda.Yadda([jsonRequiredUtilityStep], {});

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    // each features / scenarios / steps
    // --------------------------------------------------------------------------------------------------------------------------------------------------------------
    new Yadda.FeatureFileSearch('./test/features').each(function(file) {
        featureFile(file, function(feature) {
            scenarios(feature.scenarios, function(scenario) {
                steps(scenario.steps, function(step, done) {
                    yadda.run(step, done);
                });
            });
        });
    });

}());