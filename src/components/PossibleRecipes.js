import React from "react";

const PossibleRecipes = (ingredientNumber) => {
  const z = ingredientNumber.ingredientNumber.ingredientNumber;
  const handleclick = () => {
    for (var i = 1; i <= z; i++) {
      const x = document.getElementById("myDiv");
      const input = document.createElement("input");
      input.setAttribute("placeholder", `ingredient number ${i}`);
      input.setAttribute("name", `ingredient name number ${i}`);
      x.append(input);
    }
  };
  return (
    <div id="myDiv">
      <button onClick={handleclick}>submit</button>
      <h2>possible recipes</h2>
    </div>
  );
};

export default PossibleRecipes;
