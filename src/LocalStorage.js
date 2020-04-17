export const loadState = (storage = localStorage) => {
    try {
      const serializedState = storage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

export const saveState = (state, storage = localStorage) => {
  try {
    const serializedState = JSON.stringify(state);
    storage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
