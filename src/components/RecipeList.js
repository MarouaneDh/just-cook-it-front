import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const user = useSelector((state) => state.authReducer.user);
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const loadRecipes = useSelector((state) => state.recipeReducer.loadRecipes);

  const [cat, setCat] = useState("none");
  const handleChange = (e) => {
    e.preventDefault();
    setCat(e.target.value);
  };
  return (
    <div>
      <form>
        <label>Filter by : </label>
        <select
          name="category"
          onChange={handleChange}
          value={recipes.category}
        >
          <option>none</option>
          <option>Appetizer</option>
          <option>Main dish</option>
          <option>Dessert</option>
        </select>
      </form>
      <div className="recipe-list">
        {loadRecipes ? (
          <h2>loading</h2>
        ) : cat !== "none" ? (
          recipes.map((el) =>
            el.category === cat ? (
              <RecipeCard key={el._id} recipe={el} user={user} />
            ) : null
          )
        ) : (
          recipes.map((el) => (
            <RecipeCard key={el._id} recipe={el} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;
