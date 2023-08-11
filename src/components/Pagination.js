import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({ total }) => {
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const count = recipes.length / 2;
  const tab = [];
  let i = 0;
  for (let i = 1; i <= Math.ceil(total / 2); i++) {
    tab.push(i);
  }
  return (
    <div id="pages">
      {tab.map((el) => {
        return (
          <a className="pages" key={el} href={`/discover/page/${el}`}>
            {el}
          </a>
        );
      })}
    </div>
  );
};

export default Pagination;
