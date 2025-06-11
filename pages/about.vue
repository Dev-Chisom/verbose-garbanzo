<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">About ShopVue</h1>
      
      <div class="prose dark:prose-invert max-w-none">
        <p class="lead mb-8">
          ShopVue is your premier destination for quality products and exceptional shopping experience. 
          We believe in providing our customers with the best products, competitive prices, and outstanding service.
        </p>
        
        <img 
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
          alt="ShopVue Team" 
          class="w-full rounded-lg shadow-lg mb-8"
        />
        
        <h2>Our Story</h2>
        <p>
          Founded in 2024, ShopVue started with a simple mission: to make quality products accessible to everyone. 
          What began as a small online store has grown into a trusted marketplace serving customers worldwide.
        </p>
        
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Quality First:</strong> We carefully curate our product selection to ensure the highest quality standards.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> Your satisfaction is our top priority. We're here to help at every step.
          </li>
          <li>
            <strong>Transparency:</strong> We believe in clear communication and honest business practices.
          </li>
          <li>
            <strong>Innovation:</strong> We continuously improve our platform to provide the best shopping experience.
          </li>
        </ul>
        
        <h2>Our Commitment</h2>
        <p>
          We're committed to providing:
        </p>
        <ul>
          <li>Fast and reliable shipping</li>
          <li>Secure payment processing</li>
          <li>Excellent customer support</li>
          <li>Easy returns and exchanges</li>
        </ul>
        
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
          <h2 class="text-xl font-semibold mb-4">Contact Us</h2>
          <p>
            Have questions? We'd love to hear from you. Send us a message or call us at:
          </p>
          <div class="mt-4">
            <p>
              <strong>Email:</strong> 
              <a href="mailto:support@shopvue.com" class="text-primary-600 hover:underline">
                support@shopvue.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> 1-800-SHOPVUE
            </p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9am - 5pm EST
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - ShopVue',
  meta: [
    { name: 'description', content: 'Learn about ShopVue, our story, values, and commitment to quality' }
  ]
})
</script>