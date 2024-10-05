

const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailContent = document.querySelector('.recipe-detail-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = "";

    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="Meal Thumbnail">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });
            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = "<h2>No recipes found</h2>";
    }
};

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    } else {
        recipeContainer.innerHTML = "<h2>Please enter a search term</h2>";
    }
});

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    `;
    recipeDetailContent.parentElement.style.display = "block";
};

/*recipeCloseBtn.addEventListener('click', () => {
    recipeDetailContent.parentElement.style.display = "none";
});*/
recipeCloseBtn.addEventListener('click', () => {
    document.querySelector('.recipe-detail').style.display = "none";
});