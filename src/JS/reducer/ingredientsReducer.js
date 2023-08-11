import {
  ADD_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
  GET_ALL_INGREDIENTS,
} from "../constant/actionTypesIngredients";

const initialState = {
  ingredientsList: [],
  loadIngredients: false,
  errors: null,
  recipe: {},
};

export const ingredientsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_INGREDIENTS:
      return {
        ...state,
        loadIngredients: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsList: payload,
        loadIngredients: false,
      };
    case GET_INGREDIENTS_FAIL:
      return {
        ...state,
        loadIngredients: false,
        errors: payload,
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredientsList: [...state.ingredientsList, payload],
      };
    default:
      return state;
  }
};
