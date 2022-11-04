
const appId = "b8357617";
const appKey = "5ac80a3a940c58f142083f2147089c67";
const recipeURL = "https://api.edamam.com/search?q=";

const searchInput = document.querySelector("input");
const searchResults = document.querySelector("section");
const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const searchQuery = searchInput.value;
  fetchData(searchQuery);
});

const fetchData = async function(searchQuery) {
  const response = await fetch(`${recipeURL}${searchQuery}&app_id=${appId}&app_key=${appKey}`);
  const data = await response.json();
  displayRecipes(data.hits);
}

function displayRecipes(results) {
  let output = "";

  results.forEach((results) => {
    output += `
    <article>
      <img src="${results.recipe.image}" alt = "Picture of ${results.recipe.label}" />
      <div class="content-wrapper">
        <h2>${results.recipe.label}</h2>
        <button><a href="${results.recipe.url}" target="_blank">View Recipe</a></button>
      </div>
      <ul>
        <li>Calories: ${results.recipe.calories.toFixed(2)}</li>
        <li>Diet Label: ${results.recipe.dietLabels}</p>
        <li>Cuisine Type: ${results.recipe.cuisineType}</li>
        <li>Source: ${results.recipe.source}</li>
      </ul>
    </article>
    `;

    searchResults.innerHTML = output;
  });
}
