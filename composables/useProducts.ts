import { ref, computed } from 'vue'
import { getFirestore, collection, query, where, orderBy, limit, getDocs, startAfter, doc, getDoc, type DocumentData, type QueryDocumentSnapshot, type Query } from 'firebase/firestore'
import type { Product, ProductFilters, ProductState } from '~/types'

export function useProducts() {
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const products = ref<Product[]>([])
  const lastVisible = ref<QueryDocumentSnapshot<DocumentData> | null>(null)
  const hasMore = ref<boolean>(true)

  const fetchProducts = async (options: ProductFilters = {}): Promise<void> => {
    const {
      category = '',
      minPrice = null,
      maxPrice = null,
      rating = null,
      sort = 'newest',
      pageSize = 12,
      lastDoc = null
    } = options

    loading.value = true
    error.value = null

    try {
      const db = getFirestore()
      const productsRef = collection(db, 'products')

      // Build query with filters
      const filters = []
      if (category) filters.push(where('category', '==', category))
      if (minPrice !== null) filters.push(where('price', '>=', minPrice))
      if (maxPrice !== null) filters.push(where('price', '<=', maxPrice))
      if (rating !== null) filters.push(where('averageRating', '>=', rating))

      // Add sorting
      let sortField = 'createdAt'
      let sortDirection: 'asc' | 'desc' = 'desc'
      
      switch (sort) {
        case 'price_asc':
          sortField = 'price'
          sortDirection = 'asc'
          break
        case 'price_desc':
          sortField = 'price'
          sortDirection = 'desc'
          break
        case 'rating':
          sortField = 'averageRating'
          sortDirection = 'desc'
          break
      }

      let productsQuery: Query<DocumentData> = query(
        productsRef,
        ...filters,
        orderBy(sortField, sortDirection),
        limit(pageSize)
      )

      if (lastDoc) {
        productsQuery = query(productsQuery, startAfter(lastDoc))
      }

      const snapshot = await getDocs(productsQuery)
      
      const newProducts = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      } as Product))

      products.value = lastDoc ? [...products.value, ...newProducts] : newProducts
      lastVisible.value = snapshot.docs[snapshot.docs.length - 1] || null
      hasMore.value = snapshot.docs.length === pageSize

    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  const getProduct = async (id: string): Promise<Product | null> => {
    loading.value = true
    error.value = null

    try {
      const db = getFirestore()
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Product
      } else {
        throw new Error('Product not found')
      }
    } catch (err) {
      console.error('Error fetching product:', err)
      error.value = 'Failed to load product'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    hasMore,
    lastVisible,
    fetchProducts,
    getProduct
  }
}