import "./styles.css";
import Solver from "./solver";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Quadratic eq sover</h1>
      <h2>Type in a quadratic eqution and I will try to solve it</h2>
      <p>
        Rules:
        <ul>
          <li>write all coefficients</li>
          <li>must have at least 2 terms</li>
          <li>one term must be x^2</li>
        </ul>
      </p>
      <Solver />
    </div>
  );
}
