import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Initialize Firebase
  const firebaseConfig = config.public.firebaseConfig
  const app = initializeApp(firebaseConfig)
  
  // Initialize services
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)
  
  // Make available globally
  nuxtApp.provide('firebase', { app, auth, db, storage })
})