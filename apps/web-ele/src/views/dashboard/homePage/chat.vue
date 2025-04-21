<template>
  <div class="chat-container">
    <iframe 
      :src="iframeUrl"
      id="aiChatIframe"
      frameborder="0"
      allowfullscreen
      class="chat-iframe"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// 获取当前路由的查询参数
const route = router.currentRoute.value;
const modeNameFromQuery = route.query.mode_name || '';
const kbNameFromQuery = route.query.kb_name as string || import.meta.env[`VITE_${modeNameFromQuery}_DEFAULT`];
const port = import.meta.env[`VITE_${modeNameFromQuery}_PORT`];
// 定义iframe的URL
const iframeUrl = ref(`http://${import.meta.env.VITE_AICHAT_URL}:${port}${modeNameFromQuery !== 'MEETING' ? `/?dialogue_mode=${kbNameFromQuery}` : ''}`); // 替换为实际聊天页面URL
const isLoading = ref(true);

const onIframeLoad = () => {
  isLoading.value = false;
  console.log('iframe加载完成', iframeUrl.value);
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
