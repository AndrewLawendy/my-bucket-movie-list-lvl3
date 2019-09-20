const isMovieCtrlFormInputValid = (state) => {
  const keys = Object.keys(state);
  return keys.reduce((acc, key) => {
    const value = state[key];
    let errorMessage;

    switch (key) {
      case 'title':
        if (!value) errorMessage = 'A movie name is required';
        break;
      case 'year':
        if (!value) {
          errorMessage = 'A movie year is required';
        } else if (value.length > 4 || value > new Date().getFullYear() + 1) {
          errorMessage = 'Not in the future you silly!';
        } else if (value.length < 4) {
          errorMessage = 'That\'s way before they invented camera Bro!';
        }
        break;
      case 'budget':
        if (!value) errorMessage = 'A movie budget is required';
        break;
      case 'category_ids':
        if (!value.length) errorMessage = 'At least one movie genre is required';
        break;
      default:
        errorMessage = false;
    }
    if (errorMessage) acc[key] = errorMessage;
    return acc;
  }, {});
};

export default isMovieCtrlFormInputValid;
