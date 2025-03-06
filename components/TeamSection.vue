<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">我们的团队</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          由专业人才组成的团队，为您的企业提供最佳解决方案
        </p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(member, index) in teamMembers" :key="index" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div class="bg-gradient-to-r from-blue-100 to-indigo-100 aspect-square flex items-center justify-center">
            <!-- 替换为实际头像 -->
            <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {{ member.nameInitials }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800">{{ member.name }}</h3>
            <p class="text-blue-600 mb-3">{{ member.position }}</p>
            <p class="text-gray-600 text-sm mb-4">{{ member.description }}</p>
            <div class="flex space-x-3">
              <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                <span class="i-carbon-logo-linkedin"></span>
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                <span class="i-carbon-email"></span>
              </a>
              <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                <span class="i-carbon-phone"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const teamMembers = [
  {
    name: '张志远',
    nameInitials: 'ZZ',
    position: '首席执行官',
    description: '拥有超过20年的行业经验，引领公司向前发展。'
  },
  {
    name: '李明月',
    nameInitials: 'LM',
    position: '技术总监',
    description: '专注于技术创新，推动企业数字化转型。'
  },
  {
    name: '王晓华',
    nameInitials: 'WX',
    position: '市场总监',
    description: '精通市场营销策略，帮助客户提升品牌影响力。'
  },
  {
    name: '陈思思',
    nameInitials: 'CS',
    position: '客户关系总监',
    description: '致力于提供卓越的客户服务，确保客户满意度。'
  }
];
</script>
