// // RF.js

// function searchRecipe() {
//   const query = document.getElementById('searchQuery').value;
//   const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  
//   if (query.trim() !== '') {
//     fetch(apiURL)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);

//         const recipeContainer = document.getElementById('recipeDetails');
//         recipeContainer.innerHTML = '';

//         if (data.meals) {
//           data.meals.forEach(meal => {
//             const card = `
//               <div class="recipe-card">
//                 <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//                 <div class="content">
//                   <h3>${meal.strMeal}</h3>
//                   <p>${meal.strInstructions.slice(0, 80)}...</p>
//                 </div>
//               </div>`;
//             recipeContainer.innerHTML += card;
//           });
//         } else {
//           recipeContainer.innerHTML = '<p>Recipe not found. Try another search.</p>';
//         }
//       });
//   }
// }

// // Typing start hote hi searchRecipe function ko call karega
// document.getElementById('searchQuery').addEventListener('input', searchRecipe);

// // 'Enter' press karne par bhi searchRecipe function call hoga
// document.getElementById('searchQuery').addEventListener('keydown', function(event) {
//   if (event.key === 'Enter') {
//     searchRecipe();
//   }
// });
















function searchRecipe() {
  const query = document.getElementById('searchQuery').value;
  const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  
  if (query.trim() !== '') {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const recipeContainer = document.getElementById('recipeDetails');
        recipeContainer.innerHTML = '';

        if (data.meals) {
          data.meals.forEach(meal => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="content">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strInstructions.slice(0, 80)}...</p>
              </div>
            `;
            
            // Full recipe details on click
            card.addEventListener('click', () => showFullRecipe(meal));
            
            recipeContainer.appendChild(card);
          });
        } else {
          recipeContainer.innerHTML = '<p>Recipe not found. Try another search.</p>';
        }
      });
  }
}

function showFullRecipe(meal) {
  const recipeContainer = document.getElementById('recipeDetails');
  recipeContainer.innerHTML = `
    <div class="full-recipe">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${Object.keys(meal)
          .filter(key => key.startsWith('strIngredient') && meal[key])
          .map(key => `<li>${meal[key]} - ${meal['strMeasure' + key.slice(13)]}</li>`)
          .join('')}
      </ul>
      <button onclick="searchRecipe()">Back to Search Results</button>
    </div>
  `;
}

// Event listener for typing and Enter key
document.getElementById('searchQuery').addEventListener('input', searchRecipe);
document.getElementById('searchQuery').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchRecipe();
  }
});
