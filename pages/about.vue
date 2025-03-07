<template>
  <div class="about-page container mx-auto px-4 py-12">
    <!-- 页面标题 -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-teal-700 mb-4">关于我们</h1>
      <div class="w-24 h-1 bg-teal-500 mx-auto"></div>
    </div>

    <!-- 公司简介 -->
    <section class="mb-20">
      <div class="flex items-center gap-12">
        <div class="w-1/2">
          <img src="/images/company.webp" alt="公司办公环境" class="rounded-lg shadow-lg w-full h-auto" />
        </div>
        <div class="w-1/2">
          <h2 class="text-3xl font-bold text-teal-600 mb-6">公司简介</h2>
          <p class="text-gray-700 mb-4">
            我们是一家致力于创新科技解决方案的企业，成立于2015年。依靠强大的研发团队和前瞻性的市场视野，
            我们已经成功为众多客户提供了高质量的技术服务和产品。
          </p>
          <p class="text-gray-700 mb-4">
            公司总部位于上海，在北京、深圳和杭州设有分支机构，拥有超过200名专业技术人员，
            覆盖人工智能、云计算、大数据分析等多个领域。
          </p>
        </div>
      </div>
    </section>

    <!-- 我们的使命与愿景 -->
    <section class="bg-teal-50 p-12 rounded-lg mb-20">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-teal-600 mb-2">使命与愿景</h2>
        <p class="text-gray-600">引领技术创新，赋能行业发展</p>
      </div>
      <div class="grid grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <div class="text-teal-500 text-5xl mb-4 i-carbon-idea"></div>
          <h3 class="text-2xl font-bold mb-4">我们的使命</h3>
          <p class="text-gray-700">
            通过持续创新和技术突破，为客户提供最具价值的解决方案，
            帮助企业在数字化转型中获得竞争优势。
          </p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-md">
          <div class="text-teal-500 text-5xl mb-4 i-carbon-growth"></div>
          <h3 class="text-2xl font-bold mb-4">我们的愿景</h3>
          <p class="text-gray-700">
            成为行业领先的技术服务提供商，推动科技与商业模式创新，
            为构建更智能、更高效的未来贡献力量。
          </p>
        </div>
      </div>
    </section>

    <!-- 核心团队 -->
    <section class="mb-20">
      <h2 class="text-3xl font-bold text-teal-600 mb-10 text-center">核心团队</h2>
      <div class="grid grid-cols-3 gap-8">
        <div class="team-member text-center">
          <div class="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
            <div class="i-carbon-user-avatar text-7xl text-gray-400 w-full h-full flex items-center justify-center"></div>
          </div>
          <h3 class="text-xl font-bold mb-1">张明</h3>
          <p class="text-teal-600 mb-3">创始人 & CEO</p>
          <p class="text-gray-600 text-sm">
            前阿里巴巴技术专家，拥有15年互联网行业经验
          </p>
        </div>
        <div class="team-member text-center">
          <div class="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
            <div class="i-carbon-user-avatar text-7xl text-gray-400 w-full h-full flex items-center justify-center"></div>
          </div>
          <h3 class="text-xl font-bold mb-1">李华</h3>
          <p class="text-teal-600 mb-3">CTO</p>
          <p class="text-gray-600 text-sm">
            人工智能专家，曾负责多个大型技术项目
          </p>
        </div>
        <div class="team-member text-center">
          <div class="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
            <div class="i-carbon-user-avatar text-7xl text-gray-400 w-full h-full flex items-center justify-center"></div>
          </div>
          <h3 class="text-xl font-bold mb-1">王芳</h3>
          <p class="text-teal-600 mb-3">产品总监</p>
          <p class="text-gray-600 text-sm">
            10年产品管理经验，擅长用户体验设计
          </p>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="bg-teal-600 text-white p-12 rounded-lg">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold mb-2">联系我们</h2>
        <p>如果您有任何问题或合作意向，欢迎随时联系我们</p>
      </div>
      <div class="grid grid-cols-3 gap-8 text-center">
        <div>
          <div class="text-5xl mb-4 i-carbon-location mx-auto"></div>
          <h3 class="text-xl font-bold mb-2">地址</h3>
          <p>上海市浦东新区张江高科技园区</p>
        </div>
        <div>
          <div class="text-5xl mb-4 i-carbon-email mx-auto"></div>
          <h3 class="text-xl font-bold mb-2">邮箱</h3>
          <p>contact@example.com</p>
        </div>
        <div>
          <div class="text-5xl mb-4 i-carbon-phone mx-auto"></div>
          <h3 class="text-xl font-bold mb-2">电话</h3>
          <p>021-12345678</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 页面元信息
useHead({
  title: '关于我们 - 公司名称',
  meta: [
    { name: 'description', content: '了解我们公司的历史、使命、团队和愿景' }
  ]
})
</script>

<style scoped>
.team-member {
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
}
</style>