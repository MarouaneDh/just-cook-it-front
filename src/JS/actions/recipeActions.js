import { TOGGLE_FALSE, TOGGLE_TRUE } from "../constant/actionTypesRecipes";

import {
  GET_RECIPES_FAIL,
  GET_RECIPES_SUCCESS,
  GET_ALL_RECIPES,
  ADD_RECIPE,
  GET_RECIPE,
} from "../constant/actionTypesRecipes";
import axios from "axios";

export const addRecipe = (payload) => {
  return { type: ADD_RECIPE, payload };
};
export const deleteRecipe = (id) => (dispatch) => {
  axios
    .delete(`/api/recipe/${id}`)
    .then((res) => dispatch(getRecipes()))
    .catch((err) => console.log(err));
};
export const getRecipe = (id) => (dispatch) => {
  axios
    .get(`/api/recipe/${id}`)
    .then((res) => dispatch({ type: GET_RECIPE, payload: res.data.response }))
    .catch((err) => console.log(err));
};

export const getRecipes = (page, limit, total) => async (dispatch) => {
  dispatch({
    type: GET_ALL_RECIPES,
  });
  try {
    let result = await axios.get(`/api/recipe?page=${page}&limit=${limit}`);
    dispatch({
      type: GET_RECIPES_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({ type: GET_RECIPES_FAIL, payload: error });
  }
};

export const postRecipe = (recipe) => (dispatch) => {
  axios
    .post("/api/recipe", recipe)
    .then((res) => dispatch(getRecipes()))
    .catch((err) => console.log(err));
};

export const editRecipe = (id, recipe) => (dispatch) => {
  axios
    .put(`/api/recipe/${id}`, recipe)
    .then((res) => dispatch(getRecipes()))
    .catch((err) => console.log(err));
};

export const toggleTrue = () => {
  return {
    type: TOGGLE_TRUE,
  };
};
export const toggleFalse = () => {
  return {
    type: TOGGLE_FALSE,
  };
};
