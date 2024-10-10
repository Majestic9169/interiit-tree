import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import GodownData from "../data/godowns.json"

function App() {
  return (
    <div className="App">
      <TreeComponent data={GodownData} />
    </div>
  );
}

export default App;
