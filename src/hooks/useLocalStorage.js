import { useState, useEffect } from "react";

// export function useLocalStorage(key, initialValue) {
//   const [value, setValue] = useState(() => {
//     const jsonValue = localStorage.getItem(key);
//     if (jsonValue != null) return JSON.parse(jsonValue);
//     return initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }

// src/utils/localStorage.js

const PREFIX = "dreamutrack-";

export function useLocalStorage(key, initialValue) {
  const fullKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(fullKey);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
      return initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [fullKey, value]);

  return [value, setValue];
}

export function getLocalStorage(key) {
  const fullKey = PREFIX + key;

  try {
    const jsonValue = localStorage.getItem(fullKey);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

export function setLocalStorage(key, value) {
  const fullKey = PREFIX + key;

  try {
    localStorage.setItem(fullKey, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
}

export function removeLocalStorage(key) {
  const fullKey = PREFIX + key;

  try {
    localStorage.removeItem(fullKey);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

export function clearAllLocalStorage() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
