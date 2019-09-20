/* eslint-env browser */
import React from 'react';

import Header from './Header';
import MovieList from './MovieList';
import Modal from './Modal';
import FabButtons from './FabButtons';

function App() {
  return (
    <div>
      <Header />
      <MovieList />
      <Modal />
      <FabButtons />
    </div>
  );
}

export default App;
