import {
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_SUCCESS,
  GET_ALL_INGREDIENTS,
  ADD_INGREDIENTS,
} from "../constant/actionTypesIngredients";
import axios from "axios";

export const addIngredients = (payload) => {
  return { type: ADD_INGREDIENTS, payload };
};

export const getIngredients = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_INGREDIENTS,
  });
  try {
    let result = await axios.get(`/api/ingredients`);
    dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: result.data.response });
  } catch (error) {
    dispatch({ type: GET_INGREDIENTS_FAIL, payload: error });
  }
};

export const postRecipe = (Ingredients) => (dispatch) => {
  axios
    .post("/api/Ingredients", Ingredients)
    .then((res) => dispatch(getIngredients()))
    .catch((err) => console.log(err));
};
