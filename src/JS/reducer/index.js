import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { recipeReducer } from "./recipeReducer";
import { editReducer } from "./editRecipe";
import { userReducer } from "./userReducer";
import { ingredientsReducer } from "./ingredientsReducer";
export default combineReducers({
  authReducer,
  recipeReducer,
  editReducer,
  userReducer,
  ingredientsReducer,
});
