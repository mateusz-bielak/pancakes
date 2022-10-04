import { useState } from "react";
import pancakesSvg from "./assets/pancakes.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          <img src={pancakesSvg} alt="Pancakes" />
        </button>
        count is {count}
      </div>
  );
}

export default App;
