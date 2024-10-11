import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import GodownData from "../data/godowns.json"
import ItemsData from "../data/items.json"
import { useState } from 'react';
import { ItemDisplay } from '../components/ItemDisplay';

function App() {
  const [selected, select] = useState<string | null>(null);
  const [searchItem, setSearchItem] = useState<string>('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchItem(query);
  }

  return (
    <>
      <div className='input'>
        <input
          type="text"
          value={searchItem}
          onChange={handleSearch}
          placeholder="type to search godowns"
        />
      </div>
      <div className="App">
        <TreeComponent
          search={searchItem}
          value={selected}
          onChange={select}
          data={GodownData}
          items={ItemsData}
        />
        <div className="item-display">
          <ItemDisplay selectedItem={selected} />
        </div>
      </div>
    </>
  );
}

export default App;
