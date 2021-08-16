import React, { useState, FC } from "react";
import words from "lodash.words";
import { evaluate } from "mathjs";
import Functions from "./components/Functions";
import Numbers from "./components/Numbers";
import MathOperations from "./components/MathOperations";
import Result from "./components/Result";
import "./App.css";

const App: FC = () => {
  const [stack, setStack] = useState("");

  const items = words(stack, /[^-^+^*^/]+/g);

  const value = items.length > 0 ? items[items.length - 1] : "0";

  const handleOperation = (operation: string) => {
    //Valid if the last character is a number or a symbol
    let validation = /\d$/.test(stack);
    if (validation) {
      setStack(`${stack}${operation}`);
    } else {
      let newStack = stack.substring(0, stack.length - 1);
      setStack(`${newStack}${operation}`);
    }
  };

  const handleResult = () => {
    let validation = /\d$/.test(stack);
    //if the string ends with a symbol it returns error
    if (validation) {
      setStack(evaluate(stack).toString());
    } else {
      let newStack = stack.substring(0, stack.length - 1);
      setStack(evaluate(newStack).toString());
    }
  };

  return (
    <main className="react-calculator">
      <Result value={value} />
      <Numbers onClickNumber={(number) => setStack(`${stack}${number}`)} />
      <Functions
        onContentClear={() => setStack("")}
        onDelete={() => {
          if (stack.length > 0) {
            let newStack = stack.substring(0, stack.length - 1);
            setStack(newStack);
          }
        }}
      />
      <MathOperations
        onClickOperation={(operation) => handleOperation(operation)}
        onClickEqual={() => handleResult()}
      />
    </main>
  );
};

export default App;
