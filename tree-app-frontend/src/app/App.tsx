import { TreeComponent } from '../components/TreeComponent';
import './App.css';
import { useEffect, useState } from 'react';
import { ItemDisplay } from '../components/ItemDisplay';
import { Login } from '../components/Login';
import axios from 'axios';
import { Godowns, Items } from '../types/types';

function App() {
  const [selected, select] = useState<string | null>(null);
  const [searchGodown, setSearchGodown] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>('');
  const [auth, setAuth] = useState<boolean>(false);
  const [GodownData, setGodownData] = useState<Godowns | null>(null);
  const [ItemsData, setItemsData] = useState<Items | null>(null);

  const handleItemSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchItem(query);
  }

  const handleGodownSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchGodown(query);
  }

  const handleLogin = () => {
    setAuth(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://localhost:5000/data/godowns');
        const response2 = await axios.get('http://localhost:5000/data/items');

        setGodownData(response1.data);
        setItemsData(response2.data);
      } catch (err) {
        console.log(err);
      } finally {
        console.log('Data Succesfully fetched');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!auth ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div className='input'>
            <input
              type="text"
              value={searchGodown}
              onChange={handleGodownSearch}
              placeholder="type to search godowns"
            />
            <input
              type="text"
              value={searchItem}
              onChange={handleItemSearch}
              placeholder="type to search items"
            />
          </div>
          <div className="App">
            <TreeComponent
              searchGodown={searchGodown}
              searchItem={searchItem}
              value={selected}
              onChange={select}
              data={GodownData!}
              items={ItemsData!}
            />
            <div className="item-display">
              <ItemDisplay selectedItem={selected} itemsData={ItemsData!} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
