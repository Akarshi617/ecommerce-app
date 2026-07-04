// Common localStorage helper functions
// Ye file isliye banayi taaki har Context mein alag-alag
// localStorage read/write logic na likhna pade (DRY principle)

export function getFromStorage(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
      console.error(`Error reading "${key}" from storage:`, error);
      return fallback;
    }
  }
  
  export function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving "${key}" to storage:`, error);
    }
  }