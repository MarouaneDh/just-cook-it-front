import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../JS/actions/recipeActions";
import PossibleRecipes from "./PossibleRecipes";

const WhatCanICook = () => {
  const [ingredientNumber, setIngredientNumber] = useState("");
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const [ingredientsTab, setIngredientsTab] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, [ingredientsTab]);
  const handleNumber = (e) => {
    e.preventDefault();
    setIngredientNumber({
      [e.target.name]: e.target.value,
    });
  };
  const handleTabChange = (e) => {
    setIngredientsTab({ ...ingredientsTab, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="pagebody">
        <h1>What can I cook</h1>
        <p>
          type the ingredients you have in your fridge to see what you can cook
          with them
        </p>
        <div>
          <p>How many ingredients do you have?</p>
          <input
            type="number"
            placeholder="number of ingredients"
            name="ingredientNumber"
            onChange={handleNumber}
          />
          <select name="ingredient" onChange={handleTabChange}>
            {recipes.map((el) =>
              el.ingredients.map((x) => {
                return <option key={x._id}>{x.ingredientName}</option>;
              })
            )}
          </select>
          <PossibleRecipes ingredientNumber={ingredientNumber} />
          {/* <div className="displayIngredients">
            {ingredientsTab.map((el) => {
              return <div>{el}</div>;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WhatCanICook;
