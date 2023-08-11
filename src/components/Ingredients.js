import React, { useState } from "react";

const Ingredients = ({ arr }) => {
  const [ingredient, setingredient] = useState({});
  const handleIngredient = (e) => {
    console.log(e.target.id);
    let ingredient = `ingredient${e.target.id}`;
    setingredient({
      ...ingredient,
      [e.target.name]: e.target.value,
    });
  };
  return arr.map((el, i) => (
    <div id="group1">
      <input
        name="ingredientName"
        id={i}
        // value={recipe.ingredients.ingredientName || ""}
        type="text"
        placeholder={`type the ingredient ${i}'s name`}
        onChange={(e, i) => handleIngredient(e, i)}
      />
      <input
        name="ingredientValue"
        id={i}
        // value={recipe.ingredients.ingredientValue || ""}
        type="number"
        placeholder={`type the ingredient ${i}'s value`}
        onChange={(e, i) => handleIngredient(e, i)}
      />
      <input
        name="ingredientUnity"
        id={i}
        // value={recipe.ingredients.ingredientValue || ""}
        type="text"
        placeholder={`type the ingredient ${i}'s unit`}
        onChange={(e, i) => handleIngredient(e, i)}
      />
      <button>X</button>
    </div>
  ));
};

export default Ingredients;
