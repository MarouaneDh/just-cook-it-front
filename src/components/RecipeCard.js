import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import {
  deleteRecipe,
  getRecipe,
  toggleTrue,
} from "../JS/actions/recipeActions";

const RecipeCard = ({ recipe, user }) => {
  const recipes = useSelector((state) => state.recipeReducer.recipeList);
  const [data, setData] = useState(recipes);
  const dispatch = useDispatch();
  useEffect(() => {
    setData(recipes);
  }, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  var subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "800px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
    },
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  const likeRecipe = (id) => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .put(`/api/recipe/like/${id}`, { id }, options)
      .then((result) => {
        const newData = data.map((recipe) => {
          if (id === result._id) {
            return result;
          } else {
            return recipe;
          }
        });
        console.log(newData);
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const unlikeRecipe = async (id) => {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .put(`/api/recipe/unlike/${id}`, { id }, options)
      .then((result) => {
        const newData = data.map((recipe) => {
          if (id === result._id) {
            return result;
          } else {
            return recipe;
          }
        });
        console.log(newData);
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const myAlert = () => {
    alert("You must be logged on to check the recipe");
  };
  return isAuth ? (
    <div className="recipe">
      <Link to={{ pathname: `/${recipe._id}` }}>
        <i className="material-icons">local_dining</i>
        <div> </div>
        <h2>{recipe.recipeName}</h2>
        <h3>
          cooking time : {recipe.cookingTime} {recipe.timeUnit}
        </h3>
        <p>{recipe.category}</p>
        <h4>this recipe is liked by {recipe.likes.length} persons</h4>
        <h4>{recipe.comments.length} comments</h4>
      </Link>
      {user._id !== recipe.userId ? (
        recipe.likes.includes(user._id) ? (
          <div>
            <i
              className="material-icons"
              onClick={() => {
                unlikeRecipe(recipe._id);
                recipe.likes.length--;
              }}
            >
              thumb_down
            </i>
            <p>dislike this recipe</p>
          </div>
        ) : (
          <div>
            <i
              className="material-icons"
              onClick={() => {
                likeRecipe(recipe._id);
                recipe.likes.push(user._id);
              }}
            >
              thumb_up
            </i>
            <p>like this recipe</p>
          </div>
        )
      ) : null}

      <div>
        {isAuth ? (
          <div className="deleteEdit">
            {recipe.userId === user._id ? (
              <div>
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
              </div>
            ) : null}
            {recipe.userId === user._id || user.role == "admin" ? (
              <div>
                <button onClick={openModal}>DELETE RECIPE</button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Are you sure you want to delete this recipe
                  </h2>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(deleteRecipe(recipe._id));
                      }}
                    >
                      DELETE RECIPE
                    </button>
                    <button onClick={closeModal}>No</button>
                  </div>
                </Modal>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div className="recipe" onClick={myAlert}>
      <i className="material-icons">local_dining</i>
      <div> </div>
      <h2>{recipe.recipeName}</h2>
      <h3>
        cooking time : {recipe.cookingTime} {recipe.timeUnit}
      </h3>
      <p>{recipe.category}</p>
      <h4>this recipe is liked by {recipe.likes.length} persons</h4>
      <h4>{recipe.comments.length} comments</h4>
    </div>
  );
};

export default RecipeCard;
