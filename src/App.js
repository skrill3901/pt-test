import React from 'react';

import ValuteList from './features/valutesList/ValuteList';
import Filters from './features/filters/Filters';
import Search from './features/search/Search';
import RefetchValutes from './features/refetchValutes/RefetchValutes';


function App() {
  return (
    <main className="app">
      <div className='valutes-list'>
        <ValuteList />
      </div>
      <div className="content__interactive">
        <div className='wrapper'>
          <Filters/>
          <Search/>
          <RefetchValutes/>
        </div>
      </div>
    </main>
  );
}

export default App;
