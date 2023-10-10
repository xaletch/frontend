import React, { useEffect, useState } from 'react';

import './style/index.css';

import { Loading } from './components/Loading/Loading';
import { Home } from './page/Home/Home';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      const timeout = setTimeout(() => {
          setIsLoading(false);
      }, 1500);
  
      return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      {isLoading && <Loading />}
      {!isLoading && <Home />}
    </div>
  );
}

export default App;
