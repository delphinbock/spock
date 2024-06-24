// React
// @ts-ignore
import React from 'react';

// Cache system NPM
import { LRUCache } from 'lru-cache';

// Axios
import axios, { AxiosResponse } from 'axios';

// Types
import { LoadImage } from "@typage/mainType";

// Create LRU cache instance
export const imageCache = new LRUCache<string, string>({
  max: 50, // Maximum number of items in the cache
  ttl: 1000 * 60 * 10, // Time to live in milliseconds (e.g., 10 minutes)
});

// Fetch base64 image using Axios
const fetchImage = async (keyStr: string) => {
  try {
    // Images path
    const path = `/img/${keyStr}.base64`;

    // Get image
    const response: AxiosResponse<string> = await axios.get(path, {
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
    throw error;
  }
}

const loadImage: LoadImage = async ({ keyStr, fallbackImage = '/default.base64' }) => {
  // Check cache first
  if (imageCache.has(keyStr)) {
    return imageCache.get(keyStr)!;
  }

  try {
    // Image fetch
    const base64Image = await fetchImage(keyStr);

    // Cache the fetched image
    imageCache.set(keyStr, base64Image);

    return base64Image;
  } catch (error) {
    console.error(`Error loading image: ${error}`);
    return fallbackImage;
  }
}

export { loadImage };
