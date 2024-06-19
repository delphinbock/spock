// React
// @ts-ignore
import React from 'react';

// Cache system NPM
import { LRUCache } from 'lru-cache';

// Axios
import axios from 'axios';

// Types
import { LoadImage } from "@typage/mainType";

// Create LRU cache instance
export const imageCache = new LRUCache<string, string>({
  max: 50, // Maximum number of items in the cache
  ttl: 1000 * 60 * 5, // Time to live in milliseconds (e.g., 5 minutes)
});

const loadImage: LoadImage = async ({ keyStr }) => {
  try {
    // Check cache first
    if (imageCache.has(keyStr)) {
      const cachedImage = imageCache.get(keyStr);
      if (cachedImage) {
        return cachedImage;
      }
    }

    // Fetch base64 image using Axios
    const path = `/img/${keyStr}.base64`
    const response = await axios.get(path);
    const base64Image = response?.data;

    // Cache the fetched image
    imageCache.set(keyStr, base64Image);

    return base64Image;
  } catch (error) {
    console.error(':( Error fetching image: ', error);
    throw error;
  }
};

export { loadImage };
