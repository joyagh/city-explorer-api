const  axios  = require("axios");

class Recipe {
  constructor(recipe) {
    this.uri = recipe.uri;
    this.label = recipe.label;
    this.image_url = recipe.image;
    this.ingredients = recipe.ingredientLines;
    this.totalTime = recipe.totalTime;
  }
}

function getRecipes(request, response) {
  const ingredient = request.query.ingredient;
  const url = `https://api.edamam.com/api/recipes/v2?app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}&q=${ingredient}&type=public`;

  axios
    .get(url)
    .then(res => {
      const recipeArr = res.data.hits.map(recipe => new Recipe(recipe.recipe));
      response.status(200).send(recipeArr);
    })
    .catch(err => {
      console.error('error', err);
      response.status(500).send('error', err);
    })
}
module.exports = getRecipes