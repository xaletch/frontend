import React from 'react';
import './style/index.css';
import { Loading } from './components/Loading/Loading';
import { Button } from './components/Button/Button';
import { Home } from './page/Home/Home';

function App() {
  return (
    <div className="App w-96">
      {/* <Loading /> */}
      {/* <Button className='p-2 pl-6 pr-6'>Создать</Button> */}
      <Home />
    </div>
  );
}

export default App;
