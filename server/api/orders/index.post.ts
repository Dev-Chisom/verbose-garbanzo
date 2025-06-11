import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    // Initialize Firebase on server
    const app = initializeApp(config.public.firebaseConfig)
    const db = getFirestore(app)
    
    // Get order data from request body
    const orderData = await readBody(event)
    
    // Validate required fields
    if (!orderData.userId || !orderData.items || !orderData.shippingAddress) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required order information'
      })
    }
    
    // Add timestamps
    const timestamp = serverTimestamp()
    orderData.createdAt = timestamp
    orderData.updatedAt = timestamp
    
    // Set initial status
    orderData.status = 'pending'
    
    // Create new order document
    const orderRef = await addDoc(collection(db, 'orders'), orderData)
    
    // Return order ID and success message
    return {
      id: orderRef.id,
      message: 'Order placed successfully'
    }
  } catch (error) {
    console.error('Error creating order:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create order'
    })
  }
})