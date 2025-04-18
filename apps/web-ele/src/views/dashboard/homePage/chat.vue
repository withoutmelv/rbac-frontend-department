<template>
  <div class="chat-container">
    <iframe 
      :src="iframeUrl"
      frameborder="0"
      allowfullscreen
      class="chat-iframe"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const iframeUrl = ref('http://192.168.32.153:8501/'); // 替换为实际聊天页面URL
const isLoading = ref(true);

const onIframeLoad = () => {
  isLoading.value = false;
  console.log('iframe加载完成');
};
</script>

<style scoped>
.chat-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.chat-iframe {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
