// Types
import { LoadImage } from "../types/mainType"

// Cache system NPM
import { LRUCache } from 'lru-cache'

// Images path
const imgPath = import.meta.env.VITE_APP_IMG_PATH

// Create LRU cache instance
export const imageCache = new LRUCache<string, string>({
  max: 50, // Maximum number of items in the cache
  ttl: 1000 * 60 * 5, // Time to live in milliseconds (e.g., 5 minutes)
})

const loadImage: LoadImage = async ({ keyStr }) => {
  try {
    // Check cache first
    if (imageCache.has(keyStr)) {
      const cachedImage = imageCache.get(keyStr)
      if (cachedImage) {
        return cachedImage
      }
    }

    // fetch base64 image
    const response = await fetch(`${imgPath}${keyStr}.base64`)
    const base64Image = await response.text()

    // Cache the fetched image
    imageCache.set(keyStr, base64Image)

    return base64Image
  } catch (error) {
    console.error(':( Error fetching image:', error)
    throw error
  }
}

export { loadImage }