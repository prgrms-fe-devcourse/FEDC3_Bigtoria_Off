const storage = localStorage;

export const getStorage = (key: string, defaultValue = '') => {
  try {
    const storedValue = JSON.parse(storage.getItem(key) || '""');

    return storedValue ? storedValue : defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const setStorage = <T>(key: string, value: T) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
