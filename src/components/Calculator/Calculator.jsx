import { useReducer } from "react";
import Button from "../Button/Button";
import Insert from "../Insert/Insert";
import styles from "./Calculator.module.css";

const initialState = {
  operant1: "",
  operant2: "",
  action: "",
  equal: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        operant1: state.action
          ? state.operant1
          : state.operant1 + action.payload,
        operant2: state.action
          ? state.operant2 + action.payload
          : state.operant2,
      };
    case "SET_ACTION":
      return {
        ...state,
        action: action.payload,
        equal: false,
      };
    case "EQUAL":
      let value;
      if (state.action === "+") {
        value = Number(state.operant1) + Number(state.operant2);
      } else {
        value = Number(state.operant1) - Number(state.operant2);
      }
      return {
        ...state,
        operant1: value,
        operant2: "",
        action: "",
        equal: true,
      };
    case "CLEAR":
      return {
        ...state,
        operant1: "",
        operant2: "",
        action: "",
        equal: false,
      };
    default:
      return state;
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const actions = ["+", "-", "C", "="];

  const setValue = (num) => {
    dispatch({ type: "SET_VALUE", payload: num });
  };

  const setAction = (action) => {
    if (state.operant1 === "") return;

    if (action === "=") {
      dispatch({ type: "EQUAL" });
    } else if (action === "C") {
      dispatch({ type: "CLEAR" });
    } else {
      dispatch({ type: "SET_ACTION", payload: action });
    }
  };

  return (
    <div className={`${styles["calculator"]} ${state.equal ? "equal" : ""}`}>
      <Insert
        value={state.operant1 + state.action + state.operant2}
        state={state}
      />
      <div className={styles["calculator-btns"]}>
        <div className={styles["nums"]}>
          {nums.map((num) => (
            <Button onClick={setValue} key={num} text={num} />
          ))}
        </div>
        <div className={styles["actions"]}>
          {actions.map((action) => (
            <Button onClick={setAction} key={action} text={action} />
          ))}
        </div>
      </div>
    </div>
  );
}
