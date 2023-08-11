import {
  ADD_RECIPE,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_FAIL,
  GET_ALL_RECIPES,
  GET_RECIPE,
} from "../constant/actionTypesRecipes";

const initialState = {
  recipeList: [],
  loadRecipes: false,
  errors: null,
  recipe: {},
  total: null,
};

export const recipeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return { ...state, recipe: payload };
    case GET_ALL_RECIPES:
      return {
        ...state,
        loadRecipes: true,
      };
    case GET_RECIPES_SUCCESS:
      return {
        ...state,
        recipeList: payload.response,
        total: payload.total,
        loadRecipes: false,
      };
    case GET_RECIPES_FAIL:
      return {
        ...state,
        loadRecipes: false,
        errors: payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipeList: [...state.recipeList, payload],
      };
    default:
      return state;
  }
};
