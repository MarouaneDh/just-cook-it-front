import React, { useState } from "react";

const X = () => {
  const [ingredientNumber, setIngredientNumber] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIngredientNumber({
      [e.target.name]: e.target.value,
    });
  };

  let ingredients = "";
  {
    for (let i = 0; i <= ingredientNumber; i++) {
      ingredients.concat(`
        <div>
        <input/>
        <input/>
        <input/>
        </div>
        `);
    }
  }
  return (
    <div>
      <input
        name="ingredientNumber"
        placeholder="type number of ingredients"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default X;
