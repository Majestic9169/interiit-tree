import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import GodownData from "../data/godowns.json"
import ItemsData from "../data/items.json"
import { useState } from 'react';
import { ItemDisplay } from '../components/ItemDisplay';
import { Login } from '../components/Login';

function App() {
  const [selected, select] = useState<string | null>(null);
  const [searchItem, setSearchItem] = useState<string>('');
  const [auth, setAuth] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchItem(query);
  }

  const handleLogin = () => {
    setAuth(true);
  }

  return (
    <>
      {!auth ? (
        <Login onLogin={handleLogin} />
      ) : (
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
      )}
    </>
  );
}

export default App;
