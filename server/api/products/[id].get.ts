import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    // Initialize Firebase on server
    const app = initializeApp(config.public.firebaseConfig)
    const db = getFirestore(app)
    
    // Get product ID from URL
    const id = event.context.params.id
    
    // Get product document
    const productDoc = await getDoc(doc(db, 'products', id))
    
    if (!productDoc.exists()) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found'
      })
    }
    
    // Return product data
    return {
      id: productDoc.id,
      ...productDoc.data()
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch product'
    })
  }
})