import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, setDoc, updateDoc, type Firestore } from 'firebase/firestore'
import type { CartItem } from '~/types'
import { useAuthStore } from './auth'

interface CartState {
  items: CartItem[];
  loading: boolean;
}

interface CartGetters {
  cartCount: (state: CartState) => number;
  cartTotal: (state: CartState) => number;
  isInCart: (state: CartState) => (productId: string) => boolean;
  [key: string]: (state: CartState) => any;
}

interface CartActions {
  addToCart(item: CartItem): Promise<void>;
  updateQuantity(itemId: string, quantity: number): Promise<void>;
  removeFromCart(itemId: string): Promise<void>;
  clearCart(): Promise<void>;
  loadCart(userId?: string): Promise<void>;
  saveCart(): Promise<void>;
}

export const useCartStore = defineStore<'cart', CartState, CartGetters, CartActions>('cart', {
  state: (): CartState => ({
    items: [],
    loading: false
  }),
  
  getters: {
    cartCount: (state: CartState): number => state.items.length,
    
    cartTotal: (state: CartState): number => {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },
    
    isInCart: (state: CartState) => (productId: string): boolean => {
      return state.items.some(item => item.productId === productId)
    }
  },
  
  actions: {
    async addToCart(item: CartItem): Promise<void> {
      const existingItem = this.items.find(i => i.productId === item.productId)
      
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }
      
      await this.saveCart()
    },
    
    async updateQuantity(itemId: string, quantity: number): Promise<void> {
      const item = this.items.find(i => i.id === itemId)
      
      if (item) {
        item.quantity = quantity
        await this.saveCart()
      }
    },
    
    async removeFromCart(itemId: string): Promise<void> {
      this.items = this.items.filter(item => item.id !== itemId)
      await this.saveCart()
    },
    
    async clearCart(): Promise<void> {
      this.items = []
      await this.saveCart()
    },
    
    async loadCart(userId?: string): Promise<void> {
      this.loading = true
      
      try {
        const authStore = useAuthStore()
        
        if (authStore.isAuthenticated && (userId || authStore.userId)) {
          // Get cart from Firestore
          const db: Firestore = getFirestore()
          const cartDoc = await getDoc(doc(db, 'carts', userId || authStore.userId!))
          
          if (cartDoc.exists()) {
            this.items = cartDoc.data().items || []
          }
        } else if (process.client) {
          // Get cart from localStorage
          const savedCart = localStorage.getItem('cart')
          if (savedCart) {
            this.items = JSON.parse(savedCart)
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error)
      } finally {
        this.loading = false
      }
    },
    
    async saveCart(): Promise<void> {
      try {
        const authStore = useAuthStore()
        
        if (authStore.isAuthenticated && authStore.userId) {
          // Save to Firestore
          const db: Firestore = getFirestore()
          const cartRef = doc(db, 'carts', authStore.userId)
          const cartDoc = await getDoc(cartRef)
          
          if (cartDoc.exists()) {
            await updateDoc(cartRef, { items: this.items })
          } else {
            await setDoc(cartRef, { items: this.items })
          }
        } else if (process.client) {
          // Save to localStorage
          localStorage.setItem('cart', JSON.stringify(this.items))
        }
      } catch (error) {
        console.error('Error saving cart:', error)
      }
    }
  },
  
  persist: process.client ? {
    key: 'cart',
    storage: localStorage,
    paths: ['items']
  } : false
})