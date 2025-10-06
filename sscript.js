let currentLang = 'ar'; // 'en' للإنجليزي
let langData;

async function loadLanguage(lang) {
    const res = await fetch(`lang_${lang}.json`);
    langData = await res.json();
    document.getElementById('welcome').innerText = langData.welcome;
    document.getElementById('searchLabel').innerText = langData.search;
    document.getElementById('calcLabel').innerText = langData.calculator;
}

loadLanguage(currentLang);
async function calculateNutrition(foodName, weight) {
    const res = await fetch('foods.json');
    const foods = await res.json();
    const food = foods.find(f => f.name.toLowerCase() === foodName.toLowerCase());
    if(!food) return alert("Food not found");

    const factor = weight / food.portion;
    const calories = (food.calories * factor).toFixed(2);
    const protein = (food.protein * factor).toFixed(2);
    const carbs = (food.carbs * factor).toFixed(2);
    const fat = (food.fat * factor).toFixed(2);

    let vitamins = '';
    for(let vit in food.vitamins){
        vitamins += `${vit}: ${parseFloat(food.vitamins[vit])*factor} \n`;
    }
    let minerals = '';
    for(let min in food.minerals){
        minerals += `${min}: ${parseFloat(food.minerals[min])*factor} \n`;
    }

    alert(`Calories: ${calories}\nProtein: ${protein}\nCarbs: ${carbs}\nFat: ${fat}\nVitamins:\n${vitamins}\nMinerals:\n${minerals}`);
}

// مثال
calculateNutrition('Apple', 150); // ١٥٠ جرام تفاح
<h1 id="welcome"></h1>
<label id="searchLabel" for="foodSearch"></label>
<input type="text" id="foodSearch">
<label id="calcLabel"></label>
