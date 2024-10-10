import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import GodownData from "../data/godowns.json"
import ItemsData from "../data/items.json"
import { useState } from 'react';
import { ItemDisplay } from '../components/ItemDisplay';

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
      <div className="item-display">
        <ItemDisplay selectedItem={selected} />
      </div>
    </div>
  );
}

export default App;
