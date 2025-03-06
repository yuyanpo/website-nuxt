<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">我们的服务</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          我们提供全方位的企业解决方案，满足您业务发展的各种需求
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(service, index) in services" :key="index" class="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
          <div class="bg-blue-100 inline-flex p-3 rounded-full mb-5">
            <div :class="`text-blue-600 text-2xl ${service.icon}`"></div>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">{{ service.title }}</h3>
          <p class="text-gray-600">{{ service.description }}</p>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <NuxtLink to="/services" class="inline-flex items-center text-blue-600 font-medium">
          查看所有服务
          <span class="i-carbon-arrow-right ml-2"></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: '数字化转型',
    description: '帮助企业实现数字化转型，优化业务流程，提高运营效率。',
    icon: 'i-carbon-cloud-app'
  },
  {
    title: '市场营销',
    description: '制定有效的市场营销策略，提升品牌形象和市场竞争力。',
    icon: 'i-carbon-chart-line'
  },
  {
    title: '技术开发',
    description: '提供专业的软件开发服务，满足企业的个性化需求。',
    icon: 'i-carbon-code'
  },
  {
    title: '客户服务',
    description: '提供优质的客户服务，确保客户满意度和忠诚度。',
    icon: 'i-carbon-user-avatar'
  },
  {
    title: '数据分析',
    description: '通过数据分析，为企业决策提供科学依据。',
    icon: 'i-carbon-chart-column'
  },
  {
    title: '安全解决方案',
    description: '为企业提供全面的安全解决方案，保障信息安全。',
    icon: 'i-carbon-security'
  }
];
</script>
