import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../JS/actions/recipeActions";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const loadRecipes = useSelector((state) => state.recipeReducer.loadRecipes);
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  return (
    <div>
      <div className="pagebody">
        <h1 className="nav">My recipes</h1>
        {isAuth ? (
          <div className="recipe-list">
            {loadRecipes ? (
              <h2>loading</h2>
            ) : (
              recipes.map((el) =>
                el.userId === user._id ? (
                  <RecipeCard key={el._id} recipe={el} user={user} />
                ) : null
              )
            )}
            <Link to={{ pathname: "/addRecipe" }}>
              <div className="addrecipe">add a new recipe</div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyRecipes;
