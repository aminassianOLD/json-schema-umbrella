#
#     This file is part of json-schema-umbrella.
#
#     json-schema-umbrella is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     (at your option) any later version.
#
#     json-schema-umbrella is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.
#
#     You should have received a copy of the GNU General Public License
#     along with json-schema-umbrella.  If not, see <http://www.gnu.org/licenses/>
#


Feature: json-schema-umbrella

Scenario: without options

    When i call umbrella.analyse without options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: empty options

    Given new options {}
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: missing option.schema

    Given new options {}
    with options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: missing option.flag

    Given new options {}
    with options.schema = <<<EOT
    { "properties": { "a": { } }, "required": [] }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: empty result

    Given new options {}
    with options.schema = <<<EOT
    {
        "properties": {
            "a": {
            }
        },
        "required": []
    }
    EOT;
    and options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: missing properties

    Given new options {}
    with options.schema = <<<EOT
    {
        "required": ["b"]
    }
    EOT;
    and options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'b' required",
                "path": "/required"
            }
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json


Scenario: unemployed required - example 1

    Given new options {}
    with options.schema = <<<EOT
    {
        "properties": {
            "a": {
            }
        },
        "required": ["b"]
    }
    EOT;
    and options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'b' required",
                "path": "/required"
            }
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: unemployed required - example 2

    Given new options {}
    with options.schema = <<<EOT
    {
        "properties": {
            "a": {
                "type" : "object",
                "properties": {
                    "b": {
                    }
                },
                "required": ["c", "d"]
            }
        },
        "required": ["z"]
    }
    EOT;
    and options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'c' required",
                "path": "/properties/a/required"
            },
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'd' required",
                "path": "/properties/a/required"
            },
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'z' required",
                "path": "/required"
            }
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: required without default - example 1

    Given new options {}
    with options.schema = <<<EOT
    {
        "properties": {
            "a": {
            },
            "b": {
                "default" : "string"
            }
        },
        "required": ["a", "b"]
    }
    EOT;
    and options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
            {
                "code" : "MISSING_REQUIRED_DEFAULT",
                "message" : "'a' required as no default",
                "path": "/required"
            }
        ]
    }
    EOT;
    and result is validate analyse.out.schema.json

Scenario: unemployed required and required without default

    Given new options {}
    with options.schema = <<<EOT
    {
        "properties": {
            "a": {
            },
            "b": {
                "type" : "object",
                "default" : {},
                "properties" : {
                    "y": {
                    }
                },
                "required": ["c"]
            }
        },
        "required": ["a", "b", "z"]
    }
    EOT;
    and options.options = <<<EOT
    {
    }
    EOT;
    and analyse.in.schema.json validate options
    When i call umbrella.analyse with options
    Then umbrella.analyse return <<<EOT
    {
        "licence" : "GPL-3.0",
        "donate" : [
            "https://pledgie.com/campaigns/27813",
            "https://gratipay.com/aminassian"
        ],
        "analyse" : [
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'c' required",
                "path": "/properties/b/required"
            },
            {
                "code" : "UNEMPLOYED_REQUIRED",
                "message" : "unemployed 'z' required",
                "path": "/required"
            },
            {
                "code" : "MISSING_REQUIRED_DEFAULT",
                "message" : "'a' required as no default",
                "path": "/required"
            }
        ]
    }
    EOT;
    and analyse.out.schema.json validate result