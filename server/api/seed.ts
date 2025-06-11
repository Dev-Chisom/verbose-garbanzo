import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const products = [
  {
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 99.99,
    category: 'electronics',
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
      'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg',
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg'
    ],
    featured: true,
    inStock: true,
    quantity: 50,
    averageRating: 4.5
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected',
    price: 199.99,
    category: 'electronics',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg'
    ],
    featured: true,
    inStock: true,
    quantity: 30,
    averageRating: 4.7
  },
  {
    name: 'Premium T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 29.99,
    category: 'clothing',
    images: [
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      'https://images.pexels.com/photos/5698850/pexels-photo-5698850.jpeg'
    ],
    featured: true,
    inStock: true,
    quantity: 100,
    averageRating: 4.2
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with amazing sound quality',
    price: 79.99,
    category: 'electronics',
    images: [
      'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg',
      'https://images.pexels.com/photos/1279108/pexels-photo-1279108.jpeg'
    ],
    featured: true,
    inStock: true,
    quantity: 45,
    averageRating: 4.4
  },
  {
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID protection',
    price: 49.99,
    category: 'accessories',
    images: [
      'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
    ],
    featured: false,
    inStock: true,
    quantity: 60,
    averageRating: 4.6
  }
]

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const app = initializeApp(config.public.firebaseConfig)
    const db = getFirestore(app)

    // Add products to Firestore
    const results = await Promise.all(
      products.map(product => 
        addDoc(collection(db, 'products'), {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      )
    )

    return {
      success: true,
      message: `Added ${results.length} products to the database`
    }
  } catch (error) {
    console.error('Error seeding products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to seed products'
    })
  }
})