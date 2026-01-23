/**
 * Safe localStorage utilities with quota handling
 *
 * Issue #3: localStorage has 5-10MB limit and can throw QuotaExceededError
 * This module provides safe operations with automatic cleanup
 */

import type { SessionData } from '../types';

const STORAGE_KEYS = {
  SESSION_DATA: 'interactive_session_data',
  CURRENT_PAGE: 'interactive_current_page',
  API_KEY: 'gemini_api_key'
} as const;

interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Safely get item from localStorage with error handling
 */
export function safeGetItem<T>(key: string): StorageResult<T> {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return { success: true, data: undefined };
    }

    const parsed = JSON.parse(item) as T;
    return { success: true, data: parsed };
  } catch (error) {
    console.error(`Failed to read from localStorage (${key}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Safely set item to localStorage with quota handling
 */
export function safeSetItem(key: string, value: unknown): StorageResult<void> {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return { success: true };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      // Storage is full - try to clean up
      console.warn('localStorage quota exceeded, attempting cleanup...');

      const cleaned = cleanupOldData();
      if (cleaned) {
        // Retry after cleanup
        try {
          const serialized = JSON.stringify(value);
          localStorage.setItem(key, serialized);
          return { success: true };
        } catch (retryError) {
          return {
            success: false,
            error: 'Storage full even after cleanup. Please clear some data.'
          };
        }
      }

      return {
        success: false,
        error: 'Storage quota exceeded. Oldest data has been cleared.'
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save'
    };
  }
}

/**
 * Clean up old session data to free space
 * Keeps only the most recent 20 sessions
 */
function cleanupOldData(): boolean {
  try {
    const result = safeGetItem<SessionData[]>(STORAGE_KEYS.SESSION_DATA);

    if (!result.success || !result.data) {
      return false;
    }

    const sessions = result.data;

    // Keep only the 20 most recent sessions
    const MAX_SESSIONS = 20;
    if (sessions.length > MAX_SESSIONS) {
      const recentSessions = sessions.slice(-MAX_SESSIONS);
      localStorage.setItem(STORAGE_KEYS.SESSION_DATA, JSON.stringify(recentSessions));
      console.log(`Cleaned up ${sessions.length - MAX_SESSIONS} old sessions`);
      return true;
    }

    // If we don't have many sessions, try clearing other data
    // (but keep API key)
    const storageSize = new Blob([JSON.stringify(sessions)]).size;
    if (storageSize > 1024 * 1024) { // > 1MB
      // Clear everything except API key as last resort
      const apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);
      localStorage.clear();
      if (apiKey) {
        localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
      }
      console.log('Performed full storage cleanup');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to cleanup storage:', error);
    return false;
  }
}

/**
 * Get storage usage information
 */
export function getStorageInfo(): {
  sessionCount: number;
  estimatedSizeKB: number;
  isNearLimit: boolean;
} {
  try {
    const result = safeGetItem<SessionData[]>(STORAGE_KEYS.SESSION_DATA);
    const sessions = result.data || [];

    const serialized = JSON.stringify(sessions);
    const sizeBytes = new Blob([serialized]).size;
    const sizeKB = Math.round(sizeBytes / 1024);

    // Warn if over 4MB (localStorage typically 5-10MB)
    const isNearLimit = sizeKB > 4096;

    return {
      sessionCount: sessions.length,
      estimatedSizeKB: sizeKB,
      isNearLimit
    };
  } catch (error) {
    return {
      sessionCount: 0,
      estimatedSizeKB: 0,
      isNearLimit: false
    };
  }
}

/**
 * Save session data with automatic quota handling
 */
export function saveSessionData(sessions: SessionData[]): StorageResult<void> {
  return safeSetItem(STORAGE_KEYS.SESSION_DATA, sessions);
}

/**
 * Load session data with error handling
 */
export function loadSessionData(): SessionData[] {
  const result = safeGetItem<SessionData[]>(STORAGE_KEYS.SESSION_DATA);
  return result.data || [];
}

/**
 * Save current page index
 */
export function saveCurrentPage(pageIndex: number): StorageResult<void> {
  return safeSetItem(STORAGE_KEYS.CURRENT_PAGE, pageIndex);
}

/**
 * Load current page index
 */
export function loadCurrentPage(): number {
  const result = safeGetItem<number>(STORAGE_KEYS.CURRENT_PAGE);
  return result.data ?? 0;
}

/**
 * Clear all interactive app data (but keep API key)
 */
export function clearAppData(): void {
  const apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);

  localStorage.removeItem(STORAGE_KEYS.SESSION_DATA);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_PAGE);

  // Restore API key
  if (apiKey) {
    localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
  }

  console.log('App data cleared (API key preserved)');
}

export { STORAGE_KEYS };
