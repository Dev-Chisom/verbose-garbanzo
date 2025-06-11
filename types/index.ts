export interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  createdAt: string
  lastLoginAt: string
  role?: 'admin' | 'user'
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  category: string
  subcategory?: string
  images: string[]
  featured: boolean
  inStock: boolean
  quantity: number
  ratings: Rating[]
  averageRating: number
  createdAt: Date
  updatedAt: Date
  stock: number
  [key: string]: any // For any additional fields
}

export interface Rating {
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  userId: string
  userEmail: string
  items: CartItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  subtotal: number
  tax: number
  shipping: number
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  addedAt: Date
}

export interface ProductFilters {
  category?: string
  minPrice?: number | null
  maxPrice?: number | null
  rating?: number | null
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating'
  pageSize?: number
  lastDoc?: any
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  hasMore: boolean
  lastVisible: any
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}