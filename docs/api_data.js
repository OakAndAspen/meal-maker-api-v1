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
            "field": "email",
            "description": "<p>Email</p>"
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
            "field": "registration",
            "description": "<p>Registration date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bdfe0b2de9718419037ddc6\",\n    \"email\": \"geralt@ofrivia.com\",\n    \"userName\": \"TheWeetchr\",\n    \"registration\": \"2018-11-05T06:18:26.360Z\"\n}",
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
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Group was deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "GroupNotFound",
            "description": "<p>Group was not found.</p>"
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
            "description": "<p>Group id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n   id: \"7cd5621c4d7da43f508b9d5a\"\n}",
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
            "field": "id",
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
            "type": "Object[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>Recipes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.id",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.name",
            "description": "<p>Recipe's name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "members",
            "description": "<p>Participating users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "members.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "members.name",
            "description": "<p>User's name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    id: \"7zui621c4d7da43f508b9d5a\",\n    name: \"The group of awesome\",\n    recipes: [\n      {id: \"7zui621c4d7da43f508b9d5a\", name: \"Some recipe\"},\n      {id: \"7zui621c4d7da43f508b9d4d\", name: \"Some other recipe\"}\n    ],\n    members: [\n      {id: \"5ccc621c4d7da43f508b9d5a\", name: \"Dad\"}\n      {id: \"5ccc621c4d7da43f508b6f8g\", name: \"Mom\"}\n    ]\n}",
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
            "field": "groups.id",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.name",
            "description": "<p>Group's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "groups.recipes",
            "description": "<p>Group's recipes' ids</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "groups.members",
            "description": "<p>Group's participating users' ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n     groups: [\n         {\n             id: \"7zui621c4d7da43f508b9d5a\",\n             name: \"The group of awesome\",\n             recipes: [\"7zui621c4d7da43f508b9d5a\", \"7zui621c4d7da43f508b9d4d\"],\n             members: [\"5ccc621c4d7da43f508b9d5a\", \"5ccc621c4d7da43f508b6f8g\"]\n         },\n         {\n             id: \"da43f508b9d5a5ccc621c4d7\",\n             name: \"The best group\",\n             recipes: [\"5ccc621c4d7da43f508b9d5a\", \"7zui621c4d7da43f508b9d4d\"],\n             members: [\"7zui621c4d7da43f508b9d4d\", \"5ccc621c4d7da43f508b6f8g\"]\n         }\n     ]\n}",
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
    "description": "<p>Update an existing group</p> <ul> <li>The authenticated user must be part of that group</li> </ul>",
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
          "title": "{",
          "content": "{\n    name: \"Group's name\",\n    members: [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\"],\n    recipes: [\"7zui621c4d7da43f508b9d5a\", \"7zui621c4d7da43f508b9d5a\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Group was updated</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
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
    "description": "<p>Create a new group</p> <ul> <li>The name must be at least 3 characters long</li> <li>There must be at least 2 members</li> </ul>",
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
          "content": "{\n    name: \"Stanton family\"\n    members: [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\", \"5bd7083ed584b00d1c768f2e\"]\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     _id: \"1284d7d5bbb6a43f508b9d59\",\n     name: \"Stanton family\",\n     members: [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\"],\n     recipes: []\n}",
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
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Meal was deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
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
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "recipe",
            "description": "<p>Recipe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipe.id",
            "description": "<p>Recipe'id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipe.name",
            "description": "<p>Recipe's name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "participants.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "participants.userName",
            "description": "<p>User's name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "{\n    id: \"5bbb621c4d7da43f508b9d5a\",\n    date: \"1995-12-17\"\n    recipe: {\n         id: \"5bbb621c4d7da43f508b9d67d\",\n         name: \"Hottest curry every conceived by mankind\"\n    },\n    participants: {\n      {id: \"5bbb61284d7da43f508b9d59\", userName: \"Kevin\"}\n      {id: \"5bbb61284d7da43f50876zu9\", userName: \"Grandma\"}\n    }\n}",
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
            "field": "MealNotFound",
            "description": "<p>Meal with id {id} was not found.</p>"
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
    "description": "<p>Request a list of meals</p>",
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
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "recipe",
            "description": "<p>Recipe</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipe.id",
            "description": "<p>Recipe'id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipe.name",
            "description": "<p>Recipe's name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    id: \"7ddd897c4d7da43f508b9d5a\",\n    date: \"2018-11-17\",\n    recipe: {\n      id: \"7ddd897c4d7da43f50878io0\",\n      name: \"Fried chicken\"\n    }\n}",
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
          "content": "{\n    recipeId: \"7ddd897c4d7da43f508b9d5a\",\n    date: \"2018-11-21 19:00:00\",\n    participants: [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\", \"5bd7083ed584b00d1c768f2e\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Meal was updated</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
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
    "type": "post",
    "url": "/meals",
    "title": "Create",
    "name": "PostMeal",
    "group": "Meal",
    "description": "<p>Create a new meal</p> <ul> <li>All participants must be members of the group</li> </ul>",
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
          "content": "{\n    groupId: \"5bbb621c4d7da43f508b9d5a\",\n    recipeId: \"7ddd897c4d7da43f508b9d5a\",\n    date: \"1995-12-17\",\n    participants: [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\", \"5bd7083ed584b00d1c768f2e\"]\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n    groupId: \"5bbb621c4d7da43f508b9d5a\",\n    recipeId: \"7ddd897c4d7da43f508b9d5a\",\n    date: \"1995-12-17\",\n    participants: [\"5bbb621c4d7da43f508b9d5a\", \"5bbb61284d7da43f508b9d59\", \"5bd7083ed584b00d1c768f2e\"}]\n}",
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
            "field": "Missing",
            "description": "<p>Data    Missing data</p>"
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
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Recipe was deleted</p>"
          }
        ]
      }
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
            "field": "id",
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
            "type": "Object",
            "optional": false,
            "field": "author",
            "description": "<p>Author</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author.id",
            "description": "<p>The author's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author.userName",
            "description": "<p>The author's name</p>"
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
            "field": "imgUrl",
            "description": "<p>Image URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n  _id: \"5bbb621c4d7da43f508b9d5a\",\n  name: \"Fancy recipe for fancy people\",\n  author: {\n    id: \"7zui621c4d7da43f508b9d5a\",\n    userName: \"Dad\"\n  },\n  description: \"This is probably good, or so they say\",\n  imgUrl: \"https://cdn.myapp.net/img/jhsdfo4837f.jpg\"\n}",
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
            "description": "<p>Recipe with id {id} was not found.</p>"
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
    "description": "<p>Request a list of recipes, paginated and optionally filtered by</p> <ul> <li>group (only the recipes that have been added to the given group)</li> <li>author (only the recipes that have been created by the given user)</li> <li>current user (only the recipes that the current user has rated)</li> </ul>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter",
            "description": "<p>The kind of filter to use (&quot;group&quot;, &quot;author&quot; or &quot;user&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>The current page, showing max. 5 results</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n     filter; \"group\",\n     page: 2,\n     groupId: \"5bbb621c4d7da43f508b9d5a\",\n}",
          "type": "json"
        }
      ]
    },
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
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.name",
            "description": "<p>Recipe's name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "recipes.author",
            "description": "<p>Recipe's author</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.author._id",
            "description": "<p>Author's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.author.userName",
            "description": "<p>Author's username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "{\n    recipes: [\n      {\n         _id: \"7zui621c4d7da43f508b9d5a\",\n         name: \"Recipe 1\",\n         author: {\n           _id: \"5bbb621c4d7da43f508b9d5a\",\n           userName: \"TheGreatJoe\"\n         }\n       }\n    ]\n}",
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
    "description": "<p>Update an existing recipe</p> <ul> <li>The authenticated user must be the author of the recipe</li> </ul>",
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
            "field": "imgUrl",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "ratings",
            "description": "<p>Ratings</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ratings.userId",
            "description": "<p>Rating's user's id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ratings.health",
            "description": "<p>Rating's health value</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ratings.taste",
            "description": "<p>Rating's taste value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    name: \"Recipe's name\",\n    description: \"Some awesome recipe\",\n    imgUrl: \"https://images.xyz/image.jpg\",\n    ratings: [\n      {userId: \"5bbb621c4d7da43f508b9d5a\", health: 5, taste: 2}\n      {userId: \"5bbb61284d7da43f508b9d59\", health: 1, taste: 5}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Recipe was updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RecipeNotFound",
            "description": "<p>Recipe was not found.</p>"
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
    "description": "<p>Create a new recipe</p>",
    "parameter": {
      "fields": {
        "Parameter": [
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
            "field": "imgUrl",
            "description": "<p>Image URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    authorId: \"5bbb621c4d7da43f508b9d5a\",\n    name: \"Fancy recipe\",\n    description: \"This will be good... probably\",\n    imgUrl: \"//cdn.myapp.net/img/jhsdfo4837f.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "authorId",
            "description": "<p>Author's id</p>"
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
            "field": "imgUrl",
            "description": "<p>Image URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n\n    authorId: \"5bbb621c4d7da43f508b9d5a\",\n    name: \"Fancy recipe\",\n    description: \"This will be good... probably\",\n    imgUrl: \"https://cdn.myapp.net/img/jhsdfo4837f.jpg\"\n}",
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
            "description": "<p>User was not found</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "NameTooShort",
            "description": "<p>Name is too short</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "DescriptionTooShort",
            "description": "<p>Description is too short</p>"
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
    "error": {
      "fields": {
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
      "examples": [
        {
          "title": "Request example",
          "content": "{\n    id: \"5bbb621c4d7da43f508b9d5a\"\n}",
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
            "field": "userName",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response example",
          "content": "HTTP/1.1 200 OK\n{\n    userName: \"TheAwesomeUser\",\n    email: \"awesome@stanton.xyz\"\n}",
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
            "description": "<p>User with id {id} was not found.</p>"
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
    "description": "<p>Update an existing user</p> <ul> <li>The authenticated user can only update itself</li> </ul>",
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
          "content": "{\n    password: \"Yennefer4Ever\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "UserWasUpdated",
            "description": "<p>User was updated</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
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
