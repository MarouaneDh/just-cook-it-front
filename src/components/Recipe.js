import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipe, toggleTrue } from "../JS/actions/recipeActions";

const Recipe = ({ match }) => {
  const [text, settext] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const recipe = useSelector((state) => state.recipeReducer.recipe);
  const comments = useSelector((state) => state.recipeReducer.recipe.comments);
  useEffect(() => {
    dispatch(getRecipe(match.params.id));
  }, []);

  const makeComment = (id, text) => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(`/api/recipe/comment/${id}`, { id, text }, options)
      .catch((err) => console.log(err));
    settext("");
  };
  const deleteComment = (id) => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .delete(`/api/recipe/comment/${match.params.id}/${id}`, options)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {isAuth ? (
        <div className="pagebody">
          <div className="whole-recipe">
            <h1>{recipe.recipeName}</h1>
            <div>Category : {recipe.category}</div>
            <br />
            <div className="ingredList">
              <p>Ingredients needed :</p>
              {recipe.ingredients.map((el) => {
                return (
                  <p className="oneIngred">
                    {el.ingredientName} : {el.ingredientValue}{" "}
                    {el.ingredientUnity}
                  </p>
                );
              })}
            </div>
            <h2>
              Cooking time : {recipe.cookingTime} {recipe.timeUnit}
            </h2>
            <h3>follow these steps</h3>
            <p>{recipe.steps}</p>
          </div>
          {recipe.comments.map((el) => {
            return (
              <h4 key={el._id} className="comment">
                <span>
                  {el.userName} {el.userSurname} : {el.text}
                  {el.userId == user._id || user.role == "admin" ? (
                    <button onClick={() => deleteComment(el._id)}>
                      delete
                    </button>
                  ) : null}
                  {console.log(el)}
                </span>
              </h4>
            );
          })}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              makeComment(match.params.id, text);
              dispatch(getRecipe(match.params.id));
            }}
          >
            <input
              type="text"
              placeholder="add a comment"
              onChange={(e) => settext(e.target.value)}
              value={text}
            />
          </form>
          {recipe.recipeId === recipe._id ? (
            <Link to={{ pathname: `edit/${recipe._id}` }}>
              <button
                onClick={() => {
                  dispatch(getRecipe(recipe._id));
                  dispatch(toggleTrue());
                }}
              >
                EDIT
              </button>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Recipe;
