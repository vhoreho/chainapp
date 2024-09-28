const isLocalStorageEnabled = () => typeof window !== "undefined" && window.localStorage;

export const setItem = <T>(key: string, value: T) => {
  const canUseLocalStorage = isLocalStorageEnabled();

  if (canUseLocalStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  } else {
    console.error("Local storage is not available");
  }
};

export const getItem = <T>(key: string) => {
  const canUseLocalStorage = isLocalStorageEnabled();

  if (canUseLocalStorage) {
    const value = window.localStorage.getItem(key);

    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (e) {
        console.error(`Error while reading ${key} from local storage`);

        return undefined;
      }
    }
  } else {
    console.error("Local storage is not available");
  }

  return undefined;
};

export const removeItem = (key: string) => {
  const canUseLocalStorage = isLocalStorageEnabled();

  if (canUseLocalStorage) {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event("storage"));
  } else {
    console.error("Local storage is not available");
  }
};
