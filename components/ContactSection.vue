<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="grid md:grid-cols-2">
          <div class="p-10 bg-blue-600 text-white">
            <h2 class="text-3xl font-bold mb-6">联系我们</h2>
            <p class="mb-8">
              无论您有任何问题或需求，我们都随时准备为您提供帮助。请填写表单，或通过以下方式联系我们。
            </p>
            <div class="space-y-4">
              <div class="flex items-start">
                <span class="i-carbon-location text-xl mr-4 mt-1"></span>
                <div>
                  <h3 class="font-medium mb-1">地址</h3>
                  <p>北京市朝阳区建国路88号</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="i-carbon-phone text-xl mr-4 mt-1"></span>
                <div>
                  <h3 class="font-medium mb-1">电话</h3>
                  <p>+86 10 8888 7777</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="i-carbon-email text-xl mr-4 mt-1"></span>
                <div>
                  <h3 class="font-medium mb-1">邮箱</h3>
                  <p>contact@excellentcompany.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-10">
            <form class="space-y-6">
              <div>
                <label for="name" class="block mb-2 font-medium text-gray-700">姓名</label>
                <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="您的姓名" />
              </div>
              <div>
                <label for="email" class="block mb-2 font-medium text-gray-700">邮箱</label>
                <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="您的邮箱" />
              </div>
              <div>
                <label for="message" class="block mb-2 font-medium text-gray-700">留言</label>
                <textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入您的留言"></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                发送留言
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
