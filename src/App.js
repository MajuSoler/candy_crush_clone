import "./App.css";

import AnimatedBackgroundSky from "./components/cloud_background";
import Board from "./components/board";
const App = () => {
  return (
    <div className="app">
      <AnimatedBackgroundSky>
        <Board />
      </AnimatedBackgroundSky>
    </div>
  );
};
export default App;
