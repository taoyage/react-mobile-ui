import React from 'react';

type Value<T> = T | null;

const useReadLocalStorage = <T,>(key: string): Value<T> => {
  const readValue = React.useCallback((): Value<T> => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return null;
    }
  }, [key]);

  const [storedValue, setStoredValue] = React.useState<Value<T>>(readValue);

  const handleStorageChange = React.useCallback(
    (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  React.useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return storedValue;
};

export default useReadLocalStorage;
