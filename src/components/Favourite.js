import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../JS/actions/recipeActions";
import RecipeCard from "./RecipeCard";

const Favourite = () => {
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const likes = useSelector((state) => state.recipeReducer.recipelist);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <div>
      <h2>Your favourite</h2>
      <div className="favAll">
        {recipes.map((el) =>
          el.likes.map((like) =>
            like == user._id ? (
              <p key={el._id} recipe={el} user={user} className="fav">
                <Link to={{ pathname: `/${el._id}` }}>
                  {el.recipeName} {"   "}:{"   "} likes : {el.likes.length}
                  {"   "}comments : {el.comments.length}
                </Link>
              </p>
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default Favourite;
