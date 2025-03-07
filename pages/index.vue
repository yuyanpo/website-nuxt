<template>
  <div>
    <!-- 英雄区域 -->
    <HeroSection />
    
    <!-- 服务介绍 -->
    <ServicesSection />
    
    <!-- 关于我们 -->
    <AboutSection />
    
    <!-- 团队介绍 -->
    <TeamSection />
    
    <!-- 联系我们 -->
    <ContactSection />
  </div>
</template>

<script setup>
// 页面标题
useHead({
  title: '优秀企业 - 首页',
  meta: [
    { name: 'description', content: '我们是一家致力于提供高质量产品和服务的企业' }
  ]
})
</script>
