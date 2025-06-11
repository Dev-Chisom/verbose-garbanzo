import { ref, computed, onMounted } from 'vue'
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  type Auth,
  type User as FirebaseUser
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, type Firestore } from 'firebase/firestore'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import type { User } from '~/types'

let app: FirebaseApp
let auth: Auth
let db: Firestore

export function useFirebaseAuth() {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  const wishlistStore = useWishlistStore()
  const router = useRouter()
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const initializeAuth = (): void => {
    if (!app) {
      app = initializeApp(config.public.firebaseConfig)
      auth = getAuth(app)
      db = getFirestore(app)
      
      // Set up auth state listener
      onMounted(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
          loading.value = true
          
          try {
            if (user) {
              // Get user data from Firestore
              const userDoc = await getDoc(doc(db, 'users', user.uid))
              
              if (userDoc.exists()) {
                const userData = userDoc.data()
                
                const userDataFormatted: User = {
                  uid: user.uid,
                  email: user.email || '',
                  displayName: user.displayName || userData.displayName,
                  photoURL: user.photoURL || '',
                  createdAt: userData.createdAt?.toDate().toISOString() || new Date().toISOString(),
                  lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString()
                }
                
                authStore.setUser(userDataFormatted)
                
                // Load user's cart and wishlist data
                await cartStore.loadCart(user.uid)
                await wishlistStore.loadWishlist(user.uid)
              } else {
                // Create user document if it doesn't exist
                await setDoc(doc(db, 'users', user.uid), {
                  email: user.email,
                  displayName: user.displayName || '',
                  photoURL: user.photoURL || '',
                  isAdmin: false,
                  createdAt: new Date()
                })
                
                const userDataFormatted: User = {
                  uid: user.uid,
                  email: user.email || '',
                  displayName: user.displayName || '',
                  photoURL: user.photoURL || '',
                  createdAt: new Date().toISOString(),
                  lastLoginAt: new Date().toISOString()
                }
                
                authStore.setUser(userDataFormatted)
              }
            } else {
              authStore.clearUser()
            }
          } catch (err: any) {
            console.error('Auth state change error:', err)
            error.value = err.message
          } finally {
            loading.value = false
          }
        })

        return () => unsubscribe()
      })
    }
  }

  const register = async (email: string, password: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      const userData: User = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: user.metadata.creationTime || new Date().toISOString(),
        lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString()
      }
      
      authStore.setUser(userData)
    } catch (err: any) {
      console.error('Registration error:', err)
      error.value = 'Failed to register'
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      const userData: User = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: user.metadata.creationTime || new Date().toISOString(),
        lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString()
      }
      
      authStore.setUser(userData)
    } catch (err: any) {
      console.error('Login error:', err)
      error.value = 'Failed to login'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      return { success: true }
    } catch (err: any) {
      console.error('Google login error:', err)
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async (): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    error.value = null
    
    try {
      await firebaseSignOut(auth)
      cartStore.clearCart()
      wishlistStore.clearWishlist()
      router.push('/')
      return { success: true }
    } catch (err: any) {
      console.error('Signout error:', err)
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    error.value = null
    
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (err: any) {
      console.error('Password reset error:', err)
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  return {
    initializeAuth,
    register,
    login,
    loginWithGoogle,
    signOut,
    resetPassword,
    loading,
    error
  }
}