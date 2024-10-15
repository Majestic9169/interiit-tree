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
  }, [auth]);

  return (
    <>
      {!auth ? (
        <div className='login-component'>
          <div className='login-hero'>
            <h2 className='login-header'>👀 View Your Godown Data!</h2>
            <img className='login-image' src='https://cdn4.iconfinder.com/data/icons/logistics-55/50/4-512.png' />
          </div>
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div className='main-page'>
          <div className='tree-and-item'>
            <div className="tree">
              <div className='search-panel'>
                <input
                  type="text"
                  value={searchGodown}
                  onChange={handleGodownSearch}
                  placeholder="🔍 Godown Name"
                />
                <input
                  type="text"
                  value={searchItem}
                  onChange={handleItemSearch}
                  placeholder="🔍 Item Name"
                />
              </div>
              <div className='tree-component' style={
                { backgroundColor: "#e0bbe4", borderRadius: 30, marginTop: 8, height: "max-content", display: "flex", marginBottom: 12, minHeight: "100vh" }
              }
              >
                <TreeComponent
                  searchGodown={searchGodown}
                  searchItem={searchItem}
                  value={selected}
                  onChange={select}
                  data={GodownData!}
                  items={ItemsData!}
                />
              </div>
            </div>
            <div className="item-display">
              <ItemDisplay selectedItem={selected} itemsData={ItemsData!} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
