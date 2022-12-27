const width = 8;
const candyColor = ["blue", "green", "orange", "purple", "red", "yellow"];
const App = () => {
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColor[Math.floor(Math.random() * candyColor.length)];
    }
  };
  return <div>top</div>;
};
export default App;
