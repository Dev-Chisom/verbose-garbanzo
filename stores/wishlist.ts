import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, setDoc, updateDoc, type Firestore } from 'firebase/firestore'
import type { WishlistItem } from '~/types'
import { useAuthStore } from './auth'

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
}

interface WishlistGetters {
  wishlistCount: (state: WishlistState) => number;
  isInWishlist: (state: WishlistState) => (productId: string) => boolean;
  [key: string]: (state: WishlistState) => any;
}

interface WishlistActions {
  addToWishlist(item: WishlistItem): Promise<void>;
  removeFromWishlist(itemId: string): Promise<void>;
  clearWishlist(): Promise<void>;
  loadWishlist(userId?: string): Promise<void>;
  saveWishlist(): Promise<void>;
}

export const useWishlistStore = defineStore<'wishlist', WishlistState, WishlistGetters, WishlistActions>('wishlist', {
  state: (): WishlistState => ({
    items: [],
    loading: false
  }),
  
  getters: {
    wishlistCount: (state: WishlistState): number => state.items.length,
    
    isInWishlist: (state: WishlistState) => (productId: string): boolean => {
      return state.items.some(item => item.productId === productId)
    }
  },
  
  actions: {
    async addToWishlist(item: WishlistItem): Promise<void> {
      if (!this.isInWishlist(item.productId)) {
        this.items.push(item)
        await this.saveWishlist()
      }
    },
    
    async removeFromWishlist(itemId: string): Promise<void> {
      this.items = this.items.filter(item => item.id !== itemId)
      await this.saveWishlist()
    },
    
    async clearWishlist(): Promise<void> {
      this.items = []
      await this.saveWishlist()
    },
    
    async loadWishlist(userId?: string): Promise<void> {
      this.loading = true
      
      try {
        const authStore = useAuthStore()
        
        if (authStore.isAuthenticated && (userId || authStore.userId)) {
          // Get wishlist from Firestore
          const db: Firestore = getFirestore()
          const wishlistDoc = await getDoc(doc(db, 'wishlists', userId || authStore.userId!))
          
          if (wishlistDoc.exists()) {
            this.items = wishlistDoc.data().items || []
          }
        } else if (process.client) {
          // Get wishlist from localStorage
          const savedWishlist = localStorage.getItem('wishlist')
          if (savedWishlist) {
            this.items = JSON.parse(savedWishlist)
          }
        }
      } catch (error) {
        console.error('Error loading wishlist:', error)
      } finally {
        this.loading = false
      }
    },
    
    async saveWishlist(): Promise<void> {
      try {
        const authStore = useAuthStore()
        
        if (authStore.isAuthenticated && authStore.userId) {
          // Save to Firestore
          const db: Firestore = getFirestore()
          const wishlistRef = doc(db, 'wishlists', authStore.userId)
          const wishlistDoc = await getDoc(wishlistRef)
          
          if (wishlistDoc.exists()) {
            await updateDoc(wishlistRef, { items: this.items })
          } else {
            await setDoc(wishlistRef, { items: this.items })
          }
        } else if (process.client) {
          // Save to localStorage
          localStorage.setItem('wishlist', JSON.stringify(this.items))
        }
      } catch (error) {
        console.error('Error saving wishlist:', error)
      }
    }
  },
  
  persist: {
    key: 'wishlist',
    storage: process.client ? localStorage : undefined,
    paths: ['items']
  }
})