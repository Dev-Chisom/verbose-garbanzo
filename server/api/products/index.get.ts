import { getFirestore, collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    // Initialize Firebase on server
    const app = initializeApp(config.public.firebaseConfig)
    const db = getFirestore(app)
    
    // Get query parameters
    const queryParams = getQuery(event)
    const category = queryParams.category as string
    const sortBy = queryParams.sortBy as string || 'createdAt'
    const sortDirection = queryParams.sortDirection as 'asc' | 'desc' || 'desc'
    const lastVisible = queryParams.lastVisible as string
    const pageSize = parseInt(queryParams.pageSize as string || '12')
    
    // Build query
    let productQuery = collection(db, 'products')
    
    // Apply filters
    if (category) {
      productQuery = query(productQuery, where('category', '==', category))
    }
    
    // Apply sorting
    productQuery = query(productQuery, orderBy(sortBy, sortDirection))
    
    // Apply pagination
    if (lastVisible) {
      // Get the last document
      const lastDoc = await db.doc(`products/${lastVisible}`).get()
      productQuery = query(productQuery, startAfter(lastDoc), limit(pageSize))
    } else {
      productQuery = query(productQuery, limit(pageSize))
    }
    
    // Execute query
    const snapshot = await getDocs(productQuery)
    
    // Process results
    const products = []
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    // Return paginated results
    return {
      products,
      lastVisible: products.length > 0 ? products[products.length - 1].id : null,
      hasMore: products.length === pageSize
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products'
    })
  }
})