import NodeCache from 'node-cache';

// Initialize cache with a default TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

export const webhookCache = {
  // Store webhook data with a unique key based on timestamp
  store: (data: any) => {
    const key = `webhook_${Date.now()}`;
    cache.set(key, data);
    return key;
  },

  // Get all stored webhook data
  getAll: () => {
    const keys = cache.keys();
    const allData = keys.map(key => ({
      key,
      data: cache.get(key),
      timestamp: parseInt(key.split('_')[1])
    }));
    return allData.sort((a, b) => b.timestamp - a.timestamp);
  },

  // Get specific webhook data by key
  get: (key: string) => {
    return cache.get(key);
  },

  // Add clear method
  clear: () => {
    const keys = cache.keys();
    keys.forEach(key => cache.del(key));
  }
}; 