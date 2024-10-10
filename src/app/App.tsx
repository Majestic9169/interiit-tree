import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import GodownData from "../data/godowns.json"
import ItemsData from "../data/items.json"

function App() {
  return (
    <div className="App">
      <TreeComponent data={GodownData} items={ItemsData} />
    </div>
  );
}

export default App;
