import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../JS/actions/recipeActions";
import Pagination from "./Pagination";
import RecipeList from "./RecipeList";

const Discover = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const total = useSelector((state) => state.recipeReducer.total);
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const a = Number(pageNumber) + 1;
  const b = Number(pageNumber) - 1;
  useEffect(() => {
    setPage(Number(pageNumber));
    dispatch(getRecipes(pageNumber, 2));
  }, [page]);
  const handlePrev = (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      let x = pageNumber - 1;
      setPage(x);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    let x = pageNumber + 1;
    setPage(x);
  };

  return (
    <div>
      {isAuth ? (
        <div>
          <div className="pagebody">
            <h1 className="nav">DISCOVER</h1>
            <RecipeList />
            <Link to={{ pathname: "/addRecipe" }}>
              <div className="addrecipe">add a new recipe</div>
            </Link>
          </div>
          <div className="navigation">
            <a className="pages" href={`/discover/page/${b}`}>
              Previous
            </a>
            <Pagination total={total} />
            <a className="pages" href={`/discover/page/${a}`}>
              next
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className="pagebody">
            <h1 className="nav">DISCOVER</h1>
            <RecipeList />
          </div>
          <div className="navigation">
            <a className="pages" href={`/discover/page/${b}`}>
              Previous
            </a>
            <Pagination total={total} />
            <a className="pages" href={`/discover/page/${a}`}>
              next
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
