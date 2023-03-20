import React from 'react';
import './styles/App.scss';
import {Routes , Route} from 'react-router-dom';

import Catalog from './pages/catalog';
import PageNotFound from './pages/404';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/catalog' element={<Catalog/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
