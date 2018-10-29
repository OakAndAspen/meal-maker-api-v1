define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Log in",
    "name": "Login",
    "group": "Authentication",
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
      }
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
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "MissingData",
            "description": "<p>The username or password is missing</p>"
          },
          {
            "group": "406",
            "optional": false,
            "field": "PasswordIncorrect",
            "description": "<p>The password is incorrect</p>"
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
    "name": "Signup",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
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
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user",
            "description": "<p>User's info</p>"
          }
        ]
      }
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
    "title": "Delete a group",
    "name": "DeleteGroup",
    "group": "Group",
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
            "description": "<p>Group with id {id} was not found.</p>"
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
    "title": "Request a group's info",
    "name": "GetGroup",
    "group": "Group",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
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
            "type": "Number",
            "optional": false,
            "field": "recipes.id",
            "description": "<p>Recipe's id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
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
            "type": "Number",
            "optional": false,
            "field": "members.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "members.name",
            "description": "<p>User's name</p>"
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
            "description": "<p>Group with id {id} was not found.</p>"
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
    "title": "Request a list of groups",
    "name": "GetGroups",
    "group": "Group",
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
            "type": "Number",
            "optional": false,
            "field": "groups.id",
            "description": "<p>The group's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.name",
            "description": "<p>The group's name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "patch",
    "url": "/groups:id",
    "title": "Update an existing group",
    "name": "PatchGroup",
    "group": "Group",
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
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Participating users</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>The user's id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "recipes",
            "description": "<p>The group's recipes</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "recipes.id",
            "description": "<p>The recipe's id</p>"
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
            "description": "<p>Group was updated.</p>"
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
            "description": "<p>Group with id {id} was not found.</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User with id {id} was not found.</p>"
          },
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
    "filename": "routes/groups.js",
    "groupTitle": "Group"
  },
  {
    "type": "post",
    "url": "/groups",
    "title": "Create a new group",
    "name": "PostGroup",
    "group": "Group",
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
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Participating users</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>User's id</p>"
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
            "description": "<p>Group was created.</p>"
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
            "description": "<p>User with id {id} was not found.</p>"
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
    "url": "/meals:id",
    "title": "Delete a meal",
    "name": "DeleteMeal",
    "group": "Meal",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Meal was deleted.</p>"
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
    "url": "/meals/:id",
    "title": "Request a meal's info",
    "name": "GetMeal",
    "group": "Meal",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
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
            "type": "Number",
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
            "type": "Number",
            "optional": false,
            "field": "participants.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "participants.userName",
            "description": "<p>User's name</p>"
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
    "title": "Request a list of meals",
    "name": "GetMeals",
    "group": "Meal",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
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
            "type": "Number",
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
      }
    },
    "version": "0.0.0",
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "patch",
    "url": "/meals:id",
    "title": "Update an existing meal",
    "name": "PatchMeal",
    "group": "Meal",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
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
            "type": "Object[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "participants.id",
            "description": "<p>User's id</p>"
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
            "description": "<p>Group was updated.</p>"
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
            "description": "<p>User with id {id} was not found.</p>"
          },
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
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "post",
    "url": "/meals",
    "title": "Create a new meal",
    "name": "PostMeal",
    "group": "Meal",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "groupId",
            "description": "<p>Group's id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
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
            "type": "Object[]",
            "optional": false,
            "field": "participants",
            "description": "<p>Participating users</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "participants.id",
            "description": "<p>User's id</p>"
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
            "description": "<p>Group was created.</p>"
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
            "description": "<p>User with id {id} was not found.</p>"
          },
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
    "filename": "routes/meals.js",
    "groupTitle": "Meal"
  },
  {
    "type": "delete",
    "url": "/recipes:id",
    "title": "Delete a recipe",
    "name": "DeleteRecipe",
    "group": "Recipe",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>Recipe was deleted.</p>"
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
    "url": "/recipes/:id",
    "title": "Request a recipe's info",
    "name": "GetRecipe",
    "group": "Recipe",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
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
            "field": "author",
            "description": "<p>Author</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
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
      }
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
    "title": "Request a list of recipes",
    "name": "GetRecipes",
    "group": "Recipe",
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
            "type": "Number",
            "optional": false,
            "field": "recipes.id",
            "description": "<p>The recipe's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipes.name",
            "description": "<p>The recipe's name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "recipes.author",
            "description": "<p>The recipe's author</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.author.id",
            "description": "<p>The author's id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "recipes.author.userName",
            "description": "<p>The author's username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/recipes.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "patch",
    "url": "/recipes:id",
    "title": "Update an existing recipe",
    "name": "PatchRecipe",
    "group": "Recipe",
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
      }
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
    "type": "post",
    "url": "/recipes",
    "title": "Create a new recipe",
    "name": "PostRecipe",
    "group": "Recipe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "authorId",
            "description": "<p>The recipe's author's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The recipe's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The recipe's description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imgUrl",
            "description": "<p>The recipe's image url</p>"
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
            "description": "<p>Recipe was created.</p>"
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
            "description": "<p>User with id {id} was not found.</p>"
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
    "title": "Delete a user",
    "name": "DeleteUser",
    "group": "User",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Success",
            "description": "<p>User was deleted.</p>"
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
    "url": "/users/:id",
    "title": "Request a user's info",
    "name": "GetUser",
    "group": "User",
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
      }
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
    "title": "Request a list of users",
    "name": "GetUsers",
    "group": "User",
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
            "field": "users.userName",
            "description": "<p>Username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update an existing user",
    "name": "PatchUser",
    "group": "User",
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
      }
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
      }
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
  }
] });
