<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Dashboard Overview</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
            <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">${{ totalSales.toFixed(2) }}</p>
            <p class="text-sm text-success-600 dark:text-success-400">
              <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 inline" />
              12% from last month
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-secondary-100 dark:bg-secondary-900 rounded-full">
            <Icon name="heroicons:shopping-bag" class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalOrders }}</p>
            <p class="text-sm text-success-600 dark:text-success-400">
              <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 inline" />
              8% from last month
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-accent-100 dark:bg-accent-900 rounded-full">
            <Icon name="heroicons:users" class="w-6 h-6 text-accent-600 dark:text-accent-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalUsers }}</p>
            <p class="text-sm text-success-600 dark:text-success-400">
              <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 inline" />
              15% from last month
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-success-100 dark:bg-success-900 rounded-full">
            <Icon name="heroicons:cube" class="w-6 h-6 text-success-600 dark:text-success-400" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Products</h3>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalProducts }}</p>
            <p class="text-sm text-success-600 dark:text-success-400">
              <Icon name="heroicons:arrow-trending-up" class="w-4 h-4 inline" />
              5 new this week
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Sales Overview</h3>
        <canvas ref="salesChart" class="w-full h-64"></canvas>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Categories</h3>
        <canvas ref="categoriesChart" class="w-full h-64"></canvas>
      </div>
    </div>
    
    <!-- Recent Orders -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h3>
          <NuxtLink to="/admin/orders" class="text-primary-600 dark:text-primary-400 hover:underline">
            View all
          </NuxtLink>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="order in recentOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ order.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ${{ order.total.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(order.date).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

// Sample data (in real app, fetch from Firebase)
const totalSales = ref(125789.45)
const totalOrders = ref(1234)
const totalUsers = ref(856)
const totalProducts = ref(342)

const recentOrders = ref([
  {
    id: '1234',
    customer: 'John Doe',
    status: 'completed',
    total: 99.99,
    date: '2024-04-01T10:00:00Z'
  },
  {
    id: '1235',
    customer: 'Jane Smith',
    status: 'processing',
    total: 149.99,
    date: '2024-04-01T09:30:00Z'
  },
  {
    id: '1236',
    customer: 'Bob Johnson',
    status: 'pending',
    total: 79.99,
    date: '2024-04-01T09:00:00Z'
  }
])

const salesChart = ref(null)
const categoriesChart = ref(null)

const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
    processing: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    pending: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
    cancelled: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
  }
  
  return `px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`
}

onMounted(() => {
  // Sales Chart
  const salesCtx = salesChart.value.getContext('2d')
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#2563eb',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
  
  // Categories Chart
  const categoriesCtx = categoriesChart.value.getContext('2d')
  new Chart(categoriesCtx, {
    type: 'doughnut',
    data: {
      labels: ['Electronics', 'Clothing', 'Home & Garden', 'Books'],
      datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: ['#2563eb', '#7c3aed', '#f59e0b', '#10b981']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})

// Set page metadata
useHead({
  title: 'Admin Dashboard - ShopVue',
  meta: [
    { name: 'description', content: 'Admin dashboard with sales analytics and business metrics' }
  ]
})
</script>