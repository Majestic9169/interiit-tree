import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import GodownData from "../data/godowns.json"
import ItemsData from "../data/items.json"
import { useState } from 'react';

function App() {
  const [selected, select] = useState<string | null>(null);
  console.log(selected);

  return (
    <div className="App">
      <TreeComponent
        value={selected}
        onChange={select}
        data={GodownData}
        items={ItemsData}
      />
    </div>
  );
}

export default App;
