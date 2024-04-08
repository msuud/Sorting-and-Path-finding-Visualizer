import "./App.css";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SortingVisualizer />} />
          <Route
            path="/dijkstras_path_finding_visualizer"
            element={<PathfindingVisualizer />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
