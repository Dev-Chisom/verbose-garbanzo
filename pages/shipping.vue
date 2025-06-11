<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Shipping & Returns</h1>
      
      <div class="prose dark:prose-invert max-w-none">
        <h2>Shipping Information</h2>
        
        <h3>Domestic Shipping</h3>
        <p>We offer the following shipping options within the United States:</p>
        <ul>
          <li>
            <strong>Standard Shipping (3-5 business days)</strong>
            <ul>
              <li>Free on orders over $50</li>
              <li>$5.99 for orders under $50</li>
            </ul>
          </li>
          <li>
            <strong>Express Shipping (1-2 business days)</strong>
            <ul>
              <li>$14.99 flat rate</li>
              <li>Free on orders over $150</li>
            </ul>
          </li>
          <li>
            <strong>Same Day Delivery</strong>
            <ul>
              <li>Available in select cities</li>
              <li>$19.99 flat rate</li>
            </ul>
          </li>
        </ul>
        
        <h3>International Shipping</h3>
        <p>We ship to most countries worldwide:</p>
        <ul>
          <li>
            <strong>Standard International (7-14 business days)</strong>
            <ul>
              <li>Starting at $19.99</li>
              <li>Final rate calculated at checkout based on destination and weight</li>
            </ul>
          </li>
          <li>
            <strong>Express International (3-5 business days)</strong>
            <ul>
              <li>Starting at $39.99</li>
              <li>Available to select countries</li>
            </ul>
          </li>
        </ul>
        
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6">
          <p class="font-medium">Please Note:</p>
          <ul>
            <li>Orders are processed within 1-2 business days</li>
            <li>Shipping times are estimates and may vary</li>
            <li>International orders may be subject to customs fees</li>
          </ul>
        </div>
        
        <h2>Returns Policy</h2>
        
        <h3>Return Window</h3>
        <p>
          We accept returns within 30 days of purchase. Items must be unused, 
          unworn, and in original packaging with all tags attached.
        </p>
        
        <h3>How to Return</h3>
        <ol>
          <li>Log into your account and go to your orders</li>
          <li>Select the item(s) you wish to return</li>
          <li>Print the prepaid return label</li>
          <li>Package your items securely</li>
          <li>Drop off at any authorized shipping location</li>
        </ol>
        
        <h3>Refunds</h3>
        <ul>
          <li>Refunds are processed within 3-5 business days of receiving your return</li>
          <li>Original shipping charges are non-refundable</li>
          <li>Return shipping is free for defective items</li>
          <li>Store credit is available for items without receipt</li>
        </ul>
        
        <h3>Non-Returnable Items</h3>
        <ul>
          <li>Intimate apparel</li>
          <li>Personalized items</li>
          <li>Final sale items</li>
          <li>Gift cards</li>
        </ul>
        
        <div class="bg-primary-50 dark:bg-primary-900 p-4 rounded-lg my-6">
          <h3 class="text-primary-800 dark:text-primary-200">Need Help?</h3>
          <p>
            Our customer service team is here to assist you with any questions about 
            shipping or returns. Contact us at:
          </p>
          <ul>
            <li>Email: support@shopvue.com</li>
            <li>Phone: 1-800-SHOPVUE</li>
            <li>Live Chat: Available 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Shipping & Returns - ShopVue',
  meta: [
    { name: 'description', content: 'Learn about our shipping options and returns policy' }
  ]
})
</script>