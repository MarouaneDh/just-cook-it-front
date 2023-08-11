import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editRecipe, postRecipe } from "../JS/actions/recipeActions";
import { toggleFalse } from "../JS/actions/recipeActions";
import { getRecipe } from "../JS/actions/recipeActions";
import { postIngredients } from "../JS/actions/ingredients";

const AddRecipe = () => {
  const [inputList, setInputList] = useState([
    { ingredientName: "", ingredientValue: "", ingredientUnity: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { ingredientName: "", ingredientValue: "", ingredientUnity: "" },
    ]);
  };

  const user = useSelector((state) => state.authReducer.user);
  const recipeReducer = useSelector((state) => state.recipeReducer.recipe);
  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredientsList
  );
  const edit = useSelector((state) => state.editReducer.edit);
  const [ingredient, setingredient] = useState(ingredients);
  const [recipe, setRecipe] = useState({
    recipeName: "",
    category: "",
    steps: "",
    cookingTime: "",
    timeUnit: "",
    userId: "",
    Ingredients: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    edit
      ? setRecipe(recipeReducer)
      : setRecipe({
          recipeName: "",
          category: "",
          steps: "",
          cookingTime: "",
          timeUnit: "",
          userId: "",
          Ingredients: "",
        });
  }, [edit, recipeReducer]);
  const handleRecipe = () => {
    if (!edit) {
      dispatch(
        postRecipe({
          ...recipe,
          userId: user._id,
        })
      );
    } else {
      dispatch(getRecipe());
      dispatch(editRecipe(recipeReducer._id, recipe));
      dispatch(toggleFalse());
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };
  const addingred = () => {
    setRecipe({ ...recipe, ingredients: inputList });
    setingredient({ ...ingredients, ingredient: inputList });
  };
  return (
    <div>
      <div className="pagebody">
        <div className="bodyAddRecipe">
          <div>
            <div>
              <h1>Adding recipe</h1>
            </div>
            <div>
              <label>
                recipe name :{" "}
                <input
                  name="recipeName"
                  value={recipe.recipeName}
                  type="text"
                  placeholder="type the recipe name here"
                  onChange={handleChange}
                ></input>
              </label>
              <br />
              <label>
                category :{" "}
                <select
                  name="category"
                  value={recipe.category}
                  onChange={handleChange}
                >
                  <option>none</option>
                  <option>Appetizer</option>
                  <option>Main dish</option>
                  <option>Dessert</option>
                </select>
              </label>
              <br />
              <label>
                cooking Time :{" "}
                <input
                  name="cookingTime"
                  value={recipe.cookingTime}
                  type="number"
                  placeholder="type the cooking time here"
                  onChange={handleChange}
                />
                <select
                  name="timeUnit"
                  value={recipe.timeUnit}
                  onChange={handleChange}
                >
                  <option>Seconds</option>
                  <option>Minutes</option>
                  <option>Hours</option>
                </select>
              </label>
              <br />
              <div className="ingredientsAdd">
                <label>Ingredients : </label>
                {/*try*/}
                <div>
                  {inputList.map((x, i) => {
                    return (
                      <div className="box">
                        <input
                          name="ingredientName"
                          placeholder="Enter ingredient name"
                          value={x.ingredientName}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <input
                          className="ml10"
                          name="ingredientValue"
                          placeholder="Enter ingredient value"
                          value={x.ingredientValue}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <input
                          className="ml10"
                          name="ingredientUnity"
                          placeholder="Enter ingredient unity"
                          value={x.ingredientUnity}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                          {inputList.length !== 1 && (
                            <button
                              className="mr10"
                              onClick={() => handleRemoveClick(i)}
                            >
                              Remove
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button onClick={handleAddClick}>Add</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <button onClick={addingred}>confirm ingredients</button>
                </div>
                {/*try*/}
              </div>
              <br />
              <label>
                steps :{" "}
                <input
                  name="steps"
                  value={recipe.steps}
                  type="text"
                  placeholder="type the steps here"
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <br />
            <div>
              <Link to="/discover">
                <button onClick={handleRecipe}>{edit ? "edit" : "Save"}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
