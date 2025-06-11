import { defineStore } from 'pinia'
import type { User } from '~/types'

interface AuthState {
  user: User | null;
  loaded: boolean;
}

interface AuthGetters {
  isAuthenticated: (state: AuthState) => boolean;
  userId: (state: AuthState) => string | undefined;
  userEmail: (state: AuthState) => string | null;
  displayName: (state: AuthState) => string;
  photoURL: (state: AuthState) => string | null;
  isAdmin: (state: AuthState) => boolean;
  [key: string]: (state: AuthState) => any;
}

interface AuthActions {
  setUser(user: User): void;
  clearUser(): void;
}

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
  state: (): AuthState => ({
    user: null,
    loaded: false
  }),
  
  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.user,
    userId: (state: AuthState): string | undefined => state.user?.uid,
    userEmail: (state: AuthState): string | null => state.user?.email || null,
    displayName: (state: AuthState): string => state.user?.displayName || state.user?.email?.split('@')[0] || '',
    photoURL: (state: AuthState): string | null => state.user?.photoURL || null,
    isAdmin: (state: AuthState): boolean => state.user?.role === 'admin'
  },
  
  actions: {
    setUser(user: User): void {
      this.user = user
      this.loaded = true
    },
    
    clearUser(): void {
      this.user = null
      this.loaded = true
    }
  },
  
  persist: process.client ? {
    key: 'auth',
    storage: localStorage,
    paths: ['user']
  } : false
})