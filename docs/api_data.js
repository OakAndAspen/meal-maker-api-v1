define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Log in",
    "name": "Login",
    "group": "Authentication",
    "description": "<p>Checks the given credentials and returns an authentication token</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"userName\": \"TheWeetchr\",\n    \"password\": \"ikillghosts4pleasure\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmRmZTBiMmRlOTcxODQxOTAzN2RkYzYiLCJleHAiOjE1NDIwMDQxMTIuOTI4LCJpYXQiOjE1NDEzOTkzMTJ9.sxIQTddwcud-h_bDvDBCveU8co0zh_91htgOiZm7IbM\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>The username or password is missing</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "PasswordIncorrect",
            "description": "<p>The password is incorrect</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Sign up",
    "name": "Sign_up",
    "group": "Authentication",
    "description": "<p>User signup</p> <ul> <li>The email address and username must be unique</li> <li>The password must be at least 6 characters long and contain at least a number and a letter</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"email\": \"geralt@ofrivia.com\",\n    \"userName\": \"TheWeetchr\",\n    \"password\": \"ikillghosts4pleasure\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "registration",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 201 Created\n{\n    \"_id\": \"5bdfe0b2de9718419037ddc6\",\n    \"email\": \"geralt@ofrivia.com\",\n    \"userName\": \"TheWeetchr\",\n    \"registration\": \"2018-11-05T06:18:26.360Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>The email, username or password is missing</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "PasswordInvalid",
            "description": "<p>The password must be at least 6 characters long and contain a letter and a number</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "EmailAlreadyExists",
            "description": "<p>The email already exists</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "UsernameAlreadyExists",
            "description": "<p>The username already exists</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/groups:id",
    "title": "Delete",
    "name": "DeleteGroup",
    "group": "Group",
    "description": "<p>Delete a group</p> <ul> <li>The authenticated user must be part of that group</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "Success",
            "description": "<p>Group was deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not part of that group</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "GroupNotFound",
            "description": "<p>Group was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "get",
    "url": "/groups/:id",
    "title": "Show",
    "name": "GetGroup",
    "group": "Group",
    "description": "<p>Request a group's info</p> <ul> <li>The authenticated user must be part of that group</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>Recipes</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5be00126b1dd7244940b9c6d\",\n    \"name\": \"RedBaronCastle\",\n    \"members\": [\"5bdffb8653618745c0bba83f\",\"5bdffb3d53618745c0bba83e\"],\n    \"recipes\": [\"6adffb8653618745c0bba83f\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not part of that group</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "GroupNotFound",
            "description": "<p>Group was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "get",
    "url": "/groups",
    "title": "Index",
    "name": "GetGroups",
    "group": "Group",
    "description": "<p>Request a list of all groups the user is in</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "groups",
            "description": "<p>List of groups</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups._id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "groups.recipes",
            "description": "<p>Recipes' ids</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "groups.members",
            "description": "<p>Participating users' ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"groups\": [\n        {\n            \"members\": [\"5bdfe46d7c9e2801085676bf\", \"5bdffb3d53618745c0bba83e\"],\n             \"recipes\": [],\n            \"_id\": \"5be004248563073e743b8688\",\n            \"name\": \"KaerMorhenKitchen\"\n        },\n        {\n            \"members\": [\"5bdffb8653618745c0bba83f\", \"5bdffb3d53618745c0bba83e\"],\n            \"recipes\": [],\n            \"_id\": \"5be00126b1dd7244940b9c6d\",\n            \"name\": \"RedBaronCastle\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "patch",
    "url": "/groups/:id",
    "title": "Update",
    "name": "PatchGroup",
    "group": "Group",
    "description": "<p>Update an existing group</p> <ul> <li>The authenticated user must be part of that group</li> <li>The name must be at least 3 characters long</li> <li>There must be at least 2 members</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "members",
            "description": "<p>Participating users' ids</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "recipes",
            "description": "<p>Recipes' ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"members\": [\n        \"5bdfe46d7c9e2801085676bf\",\n        \"5bdffb3d53618745c0bba83e\",\n        \"5bdffb8653618745c0bba83f\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>Participating users ids</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>Recipes ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5be00086ba644a266c20906e\",\n    \"name\": \"RedBaronCastle\",\n    \"members\": [\n        \"5bdffb8653618745c0bba83f\",\n        \"5bdffb3d53618745c0bba83e\"\n     ],\n    \"recipes\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not part of that group</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "GroupNotFound",
            "description": "<p>Group was not found</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "post",
    "url": "/groups",
    "title": "Create",
    "name": "PostGroup",
    "group": "Group",
    "description": "<p>Create a new group</p> <ul> <li>The name must be at least 3 characters long</li> <li>There must be at least 2 members</li> <li>If the authenticated user is not listed in the members, it is automatically added</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group name</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>Participating users' ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"name\": \"RedBaronCastle\",\n    \"members\": [\n        \"5bdffb8653618745c0bba83f\",\n        \"5bdffb3d53618745c0bba83e\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "members",
            "description": "<p>Participating users ids</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>Recipes ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 201 Created\n{\n    \"_id\": \"5be00086ba644a266c20906e\",\n    \"name\": \"RedBaronCastle\",\n    \"members\": [\n        \"5bdffb8653618745c0bba83f\",\n        \"5bdffb3d53618745c0bba83e\"\n     ],\n    \"recipes\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>One of the mandatory parameters is missing</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "NameTooShort",
            "description": "<p>Name is too short</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "NotEnoughMembers",
            "description": "<p>Not enough members in the group</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "delete",
    "url": "/meals/:id",
    "title": "Delete",
    "name": "DeleteMeal",
    "group": "Meal",
    "description": "<p>Delete a meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Meal's id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "Success",
            "description": "<p>Meal was deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not participating in the meal</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "MealNotFound",
            "description": "<p>Meal was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "get",
    "url": "/meals/:id",
    "title": "Show",
    "name": "GetMeal",
    "group": "Meal",
    "description": "<p>Request a meal's info</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Meal's id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5be05aa8286aae3f3491ec24\",\n    \"groupId\": \"5bbb621c4d7da43f508b9d5a\",\n    \"recipeId\": \"7ddd897c4d7da43f508b9d5a\",\n    \"date\": \"2020-11-05T07:12:54.000Z\",\n    \"participants\": [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not participating in the meal</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "MealNotFound",
            "description": "<p>Meal was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "get",
    "url": "/meals",
    "title": "Index",
    "name": "GetMeals",
    "group": "Meal",
    "description": "<p>Request a list of meals the authenticated user participates in</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "meals",
            "description": "<p>List of meals</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals._id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "meals.recipeId",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "meals.date",
            "description": "<p>Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "meals.participants",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"meals\": [\n        {\n            \"_id\": \"5be05aa8286aae3f3491ec24\",\n            \"groupId\": \"5bbb621c4d7da43f508b9d5a\",\n             \"recipeId\": \"7ddd897c4d7da43f508b9d5a\",\n            \"date\": \"2020-11-05T07:12:54.000Z\",\n            \"participants\": [\"5bdffb8653618745c0bba83f\", \"5bbb61284d7da43f508b9d59\"]\n        },\n        {\n            \"_id\": \"5be060bbfcd6c3145cb42fa0\",\n            \"groupId\": \"5be00126b1dd7244940b9c6d\",\n            \"recipeId\": \"5be01dddca9c3f4e801310c9\",\n            \"date\": \"2020-12-05T07:12:54.000Z\",\n            \"participants\": [\"5bdffb8653618745c0bba83f\",\"5bdffb3d53618745c0bba83e\"]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "patch",
    "url": "/meals/:id",
    "title": "Update",
    "name": "PatchMeal",
    "group": "Meal",
    "description": "<p>Update an existing meal</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Meal's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Parameter",
            "type": "DateTime",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "{\n    \"date\": \"2020-08-05T07:12:54\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "201",
            "type": "DateTime",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5be05aa8286aae3f3491ec24\",\n    \"groupId\": \"5bbb621c4d7da43f508b9d5a\",\n    \"recipeId\": \"7ddd897c4d7da43f508b9d5a\",\n    \"date\": \"2020-08-05T07:12:54.000Z\",\n    \"participants\": [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "DateInvalid",
            "description": "<p>Date is invalid</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParticipantsInvalid",
            "description": "<p>Participants are not all members of this group</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not participating in the meal</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "MealNotFound",
            "description": "<p>Meal was not found</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "post",
    "url": "/meals",
    "title": "Create",
    "name": "PostMeal",
    "group": "Meal",
    "description": "<p>Create a new meal</p> <ul> <li>All participants must be members of the group</li> <li>The date must be in the future</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Parameter",
            "type": "DateTime",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"groupId\": \"5bbb621c4d7da43f508b9d5a\",\n    \"recipeId\": \"7ddd897c4d7da43f508b9d5a\",\n    \"date\": \"2020-11-05T08:12:54\",\n    \"participants\": [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "201",
            "type": "DateTime",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "201",
            "type": "String[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 201 Created\n{\n    \"_id\": \"5be05aa8286aae3f3491ec24\",\n    \"groupId\": \"5bbb621c4d7da43f508b9d5a\",\n    \"recipeId\": \"7ddd897c4d7da43f508b9d5a\",\n    \"date\": \"2020-11-05T07:12:54.000Z\",\n    \"participants\": [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\"]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "DateInvalid",
            "description": "<p>Date is invalid</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Missing data</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ParticipantsInvalid",
            "description": "<p>Participants are not all members of this group</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "delete",
    "url": "/recipes/:id",
    "title": "Delete",
    "name": "DeleteRecipe",
    "group": "Recipe",
    "description": "<p>Delete a recipe</p> <ul> <li>The authenticated user must be the author of the recipe</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Recipe's id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "Success",
            "description": "<p>Recipe was deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not the author</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/recipes/filtered/:filter",
    "title": "Filter",
    "name": "FilterRecipes",
    "group": "Recipe",
    "description": "<p>Request a list of recipes, filtered by</p> <ul> <li>group <ul> <li>Shows the recipes that have been added to the given group</li> <li>Requires <code>groupId</code></li> </ul> </li> <li>author <ul> <li>Shows the recipes by the given author</li> <li>Requires <code>authorId</code></li> </ul> </li> <li>current user <ul> <li>Shows the recipes that the current user has rated</li> </ul> </li> <li>matching <ul> <li>Shows the 3 recipes added to the group that match best the participating users ratings</li> <li>Requires <code>groupId</code> and <code>participants</code></li> </ul> </li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"group\"",
              "\"author\"",
              "\"user\"",
              "\"match\""
            ],
            "optional": false,
            "field": "filter",
            "description": "<p>The kind of filter to use</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorId",
            "description": "<p>Author's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users' ids</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "URL example",
        "content": "/recipes/filtered/match?\n    groupId=5be00126b1dd7244940b9c6d\n    &participants=5bdffb8653618745c0bba83f\n    &participants=5bdffb3d53618745c0bba83e",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>List of recipes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes._id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.authorId",
            "description": "<p>Author user's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.servings",
            "description": "<p>Servings</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "recipes.ratings",
            "description": "<p>Users ratings of this recipe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.ratings.userId",
            "description": "<p>Rating's user's id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.ratings.health",
            "description": "<p>Health rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.ratings.taste",
            "description": "<p>Taste rating</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"recipes\": [\n        {\n            \"_id\": \"5be01b75570f034068fc97af\",\n            \"authorId\": \"5bdffb3d53618745c0bba83e\",\n            \"name\": \"Werewolf soup\",\n            \"description\": \"A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.\",\n            \"imageUrl\": \"//cdn.myapp.net/img/jhsdfo4837f.jpg\",\n            \"servings\": 4,\n            \"ratings\": []\n        },\n        {\n            \"_id\": \"5be01dddca9c3f4e801310c9\",\n            \"authorId\": \"5bdffb3d53618745c0bba83e\",\n            \"name\": \"Griffin soup\",\n            \"description\": \"A witcher delicacy! Juste take the eyes and claws of your freshly killed griffin and boil them in orange juice.\",\n            \"imageUrl\": \"//cdn.myapp.net/img/jhso4837f.jpg\",\n            \"servings\": 10,\n            \"ratings\": []\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>One of the requested parameters is missing</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "FilterInvalid",
            "description": "<p>The filter is not valid</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/recipes/:id",
    "title": "Show",
    "name": "GetRecipe",
    "group": "Recipe",
    "description": "<p>Request a recipe's info</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authorId",
            "description": "<p>Author user's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "servings",
            "description": "<p>Servings</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "ratings",
            "description": "<p>Users ratings of this recipe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ratings.userId",
            "description": "<p>Rating's user's is</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ratings.health",
            "description": "<p>Health rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ratings.taste",
            "description": "<p>Taste rating</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5be01b75570f034068fc97af\",\n    \"authorId\": \"5bdffb3d53618745c0bba83e\",\n    \"name\": \"Werewolf soup\",\n    \"description\": \"A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.\",\n    \"imageUrl\": \"//cdn.myapp.net/img/jhsdfo4837f.jpg\",\n    \"servings\": 4,\n    \"ratings\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/recipes",
    "title": "Index",
    "name": "GetRecipes",
    "group": "Recipe",
    "description": "<p>Request a list of recipes, paginated, with a max. of 5 recipes per page</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>The current page, showing max. 5 results</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "URL example",
        "content": "/recipes?page=3",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>List of recipes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes._id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.authorId",
            "description": "<p>Author user's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.servings",
            "description": "<p>Servings</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "recipes.ratings",
            "description": "<p>Users ratings of this recipe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.ratings.userId",
            "description": "<p>Rating's user's is</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.ratings.health",
            "description": "<p>Health rating</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.ratings.taste",
            "description": "<p>Taste rating</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"recipes\": [\n        {\n            \"_id\": \"5be01b75570f034068fc97af\",\n            \"authorId\": \"5bdffb3d53618745c0bba83e\",\n            \"name\": \"Werewolf soup\",\n            \"description\": \"A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.\",\n            \"imageUrl\": \"//cdn.myapp.net/img/jhsdfo4837f.jpg\",\n            \"servings\": 4,\n            \"ratings\": []\n        },\n        {\n            \"_id\": \"5be01dddca9c3f4e801310c9\",\n            \"authorId\": \"5bdffb3d53618745c0bba83e\",\n            \"name\": \"Griffin soup\",\n            \"description\": \"A witcher delicacy! Juste take the eyes and claws of your freshly killed griffin and boil them in orange juice.\",\n            \"imageUrl\": \"//cdn.myapp.net/img/jhso4837f.jpg\",\n            \"servings\": 10,\n            \"ratings\": []\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "patch",
    "url": "/recipes/:id",
    "title": "Update",
    "name": "PatchRecipe",
    "group": "Recipe",
    "description": "<p>Update an existing recipe</p> <ul> <li>Only the author can update properties other than the rating</li> <li>Users can only update their own rating</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "servings",
            "description": "<p>Servings amount</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "rating",
            "description": "<p>Rating from a user</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rating.health",
            "description": "<p>Rating's health value</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rating.taste",
            "description": "<p>Rating's taste value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": " {\n     \"rating\": {\n         \"health\": 5,\n         \"taste\": 2\n      }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "authorId",
            "description": "<p>Author user's id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "servings",
            "description": "<p>Servings</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "ratings",
            "description": "<p>Users ratings of this recipe</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "ratings.userId",
            "description": "<p>Rating's user's is</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "ratings.health",
            "description": "<p>Health rating</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "ratings.taste",
            "description": "<p>Taste rating</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5be01b75570f034068fc97af\",\n    \"authorId\": \"5bdffb3d53618745c0bba83e\",\n    \"name\": \"Werewolf soup\",\n    \"description\": \"A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.\",\n    \"imageUrl\": \"//cdn.myapp.net/img/jhsdfo4837f.jpg\",\n    \"servings\": 4,\n    \"ratings\": [],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NameTooShort",
            "description": "<p>Name is less than 3 characters long</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ServingsInvalid",
            "description": "<p>Servings amount is &lt; 1</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>Required data is missing</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Non-author user is trying to edit the recipe</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "post",
    "url": "/recipes",
    "title": "Create",
    "name": "PostRecipe",
    "group": "Recipe",
    "description": "<p>Create a new recipe</p> <ul> <li>The authenticated user will be used as author</li> <li>The name must be at least 3 characters long</li> <li>The servings amount must be &gt;= 1</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "servings",
            "description": "<p>Servings amount</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"name\": \"Werewolf soup\",\n    \"description\": \"A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.\",\n    \"imageUrl\": \"//cdn.myapp.net/img/jhsdfo4837f.jpg\",\n    \"servings\": 4\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "authorId",
            "description": "<p>Author user's id</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "imageUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "servings",
            "description": "<p>Servings</p>"
          },
          {
            "group": "201",
            "type": "Object[]",
            "optional": false,
            "field": "ratings",
            "description": "<p>Users ratings of this recipe</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "ratings.userId",
            "description": "<p>Rating's user's is</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "ratings.health",
            "description": "<p>Health rating</p>"
          },
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "ratings.taste",
            "description": "<p>Taste rating</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 201 Created\n{\n    \"_id\": \"5be01b75570f034068fc97af\",\n    \"authorId\": \"5bdffb3d53618745c0bba83e\",\n    \"name\": \"Werewolf soup\",\n    \"description\": \"A witcher delicacy! Juste take the eyes and paws of your freshly killed werewolf and boil them in orange juice.\",\n    \"imageUrl\": \"//cdn.myapp.net/img/jhsdfo4837f.jpg\",\n    \"servings\": 4,\n    \"ratings\": [],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingData",
            "description": "<p>One of the mandatory parameters is missing</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "NameTooShort",
            "description": "<p>Name is too short</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ServingsInvalid",
            "description": "<p>The servings amount is not valid</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete",
    "name": "DeleteUser",
    "group": "User",
    "description": "<p>Delete a user</p> <ul> <li>The authenticated user can only delete itself</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "Success",
            "description": "<p>User was deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is trying to delete another user</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Show",
    "name": "GetUser",
    "group": "User",
    "description": "<p>Request a user's info</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registration",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bdfe46d7c9e2801085676bf\",\n    \"email\": \"ciri@ofrivia.com\",\n    \"userName\": \"SilverHair\",\n    \"registration\": \"2018-11-05T06:34:21.286Z\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Index",
    "name": "GetUsers",
    "group": "User",
    "description": "<p>Request a list of users</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "users.registration",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"users\": [\n        {\n            \"_id\": \"5bdfe46d7c9e2801085676bf\",\n            \"email\": \"ciri@ofrivia.com\",\n            \"userName\": \"SilverHair\",\n            \"registration\": \"2018-11-05T06:34:21.286Z\"\n        },\n        {\n            \"_id\": \"5bdfe0b2de9718419037ddc6\",\n            \"email\": \"geralt@ofrivia.com\",\n            \"userName\": \"TheWeetchr\",\n            \"registration\": \"2018-11-05T06:18:26.360Z\",\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update",
    "name": "PatchUser",
    "group": "User",
    "description": "<p>Update an existing user</p> <ul> <li>The authenticated user can only update itself</li> <li>The password must be at least 6 characters long and contain at least a number and a letter</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    \"password\": \"Yennefer4Ever\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registration",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bdfe46d7c9e2801085676bf\",\n    \"email\": \"ciri@ofrivia.com\",\n    \"userName\": \"SilverHair\",\n    \"registration\": \"2018-11-05T06:34:21.286Z\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "PasswordInvalid",
            "description": "<p>Password is invalid</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "NotAllowed",
            "description": "<p>Authenticated user is not allowed to do this</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
