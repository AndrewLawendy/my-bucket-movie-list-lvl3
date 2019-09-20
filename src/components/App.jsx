/* eslint-env browser */
import React from 'react';

import Header from './Header';
import MovieList from './MovieList';
import Modal from './Modal';
import FabButtons from './FabButtons';

// addToStorage(movie) {
//   const data = JSON.parse(localStorage.getItem(this.LOCAL_ITEM)) || [];
//   const movieCard = { ...movie, id: data.length };
//   localStorage.setItem(this.LOCAL_ITEM, JSON.stringify([...data, movieCard]));
//   this.updateStorage();
// }

// updateStorage() {
//   const data = JSON.parse(localStorage.getItem(this.LOCAL_ITEM)) || [];
//   this.setState({
//     data,
//   });
// }


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
