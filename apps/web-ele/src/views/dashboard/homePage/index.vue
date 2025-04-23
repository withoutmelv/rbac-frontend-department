<template>
  <div>
    <div class="home-container">
      <!-- 顶部图片展示区 -->
      <div class="banner-container">
        <img :src="banner" alt="首页banner" class="banner-image" />
        <div class="banner-title">欢迎来到deepseek AI应用赋能平台</div>
      </div>

      <!-- 底部功能卡片区 -->
      <div class="card-container">
        <div class="card-item" @click="handleCardClick('CHAT')">
          <img :src="chatIcon" alt="对话" />
          <div class="model-tag">deepseek</div>
          <div class="stars">★★★★★</div>
          <div class="card-title">对话</div>
        </div>
        <div class="card-item" @click="handleCardClick('REWRITE')">
          <img :src="rewriteIcon" alt="仿写" />
          <div class="model-tag">deepseek</div>
          <div class="stars">★★★★★</div>
          <div class="card-title">仿写</div>
        </div>
        <div class="card-item" @click="handleCardClick('MEETING')">
          <img :src="meetingIcon" alt="会议纪要" />
          <div class="model-tag">deepseek</div>
          <div class="stars">★★★★★</div>
          <div class="card-title">会议纪要</div>
        </div>
      </div>
    </div>
  
    <ElDialog
      v-model="dialogVisible"
      title="知识库选择"
      width="80%"
      top="5vh"
      custom-class="knowledge-dialog"
      :show-close="false"
    >
      <div class="knowledge-library-container">
        <div class="knowledge-card" v-for="(lib, index) in knowledgeLibraries" :key="index" @click="selectLibrary(lib)">
          <div class="knowledge-tag" :class="{'public': lib.type === 'public', 'department': lib.type === 'department'}">
            {{ typeMap[lib.type] || lib.type }}
          </div>
          <div class="knowledge-header">
            <h3>{{ lib.name }}</h3>
          </div>
          <p class="knowledge-desc">{{ lib.description }}</p>
          <span class="knowledge-count">{{ lib.fileCount }}个文件</span>
          <!-- <el-button type="primary" size="small" @click="selectLibrary(lib)">选择</el-button> -->
        </div>
      </div>
    </ElDialog>
  </div>
  
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElDialog } from 'element-plus';

import { sysfindKnowledgeByRoleId } from '#/api/sys/role-knowledge';
import { sysKnowledgePage } from '#/api/sys/knowledge';
import { useUserStore } from '@vben/stores';

import { typeMap } from '#/constant/knowledge';
// 修改为正确的图片引入方式
import banner from '#/assets/images/banner.jpg';
import chatIcon from '#/assets/images/chat-icon.png';
import rewriteIcon from '#/assets/images/rewrite-icon.png';
import meetingIcon from '#/assets/images/banner.jpg';


const router = useRouter();
const dialogVisible = ref(false);
const currentDialogType = ref('');
const userStore = useUserStore() as any;

const handleCardClick = (type: string) => {
  currentDialogType.value = type;
  if (type === 'CHAT' || type === 'REWRITE') {
    if (knowledgeLibraries.value.length == 0) {
      router.push(`/aiChat?mode_name=${type}`);
    } else {
      dialogVisible.value = true;
    }
  } else {
    router.push(`/aiChat?mode_name=${type}`);
  }
}

const knowledgeLibraries = ref([] as any);

onMounted(() => {
  if (userStore.isAdmin) {
    sysKnowledgePage({
      current: 1,
      size: 9999,
    }).then(res => {
      console.log(res)
      if (res.rows.length == 0) {
        knowledgeLibraries.value = []
        return
      }
      knowledgeLibraries.value = res.rows;
    })
  } else {
    sysfindKnowledgeByRoleId(userStore.userInfo.roleIds[0]).then(data => {
      knowledgeLibraries.value = data
    })
  }
})

const selectLibrary = (library: any) => {
  dialogVisible.value = false;
  router.push('/aiChat?kb_name=' + library.name + '&mode_name=' + currentDialogType.value);
};
</script>

<style scoped>
.knowledge-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
}

.knowledge-tag.public {
  background-color: #67c23a;
  color: white;
}

.knowledge-tag.department {
  background-color: #e6a23c;
  color: white;
}

.knowledge-library-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.knowledge-card {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.knowledge-card:hover {
  transform: translateY(-5px);
}

.knowledge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.knowledge-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.knowledge-count {
  font-size: 14px;
  color: #909399;
}

.knowledge-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 20px;
}

.dialog-content {
  padding: 20px;
}

.dialog-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.dialog-card h3 {
  margin-top: 0;
  color: #303133;
}

.dialog-card p {
  color: #606266;
}

.home-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.banner-container {
  position: relative;
  height: 40%;
  overflow: hidden;
}

.banner-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4); /* 加深透明度 */
  z-index: 1; /* 确保在图片上方 */
}

.banner-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 36px;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  z-index: 2; /* 确保在遮罩层上方 */
  white-space: nowrap;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60%;
  padding: 20px;
}

.card-item {
  position: relative;
  width: 25%;
  height: 100%; /* 添加高度100% */
  overflow: hidden; /* 添加溢出隐藏 */
  border-radius: 16px; /* 将圆角移到容器上 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影也移到容器上 */
}

.card-item img {
  width: 100%; /* 改为100%宽度 */
  height: 100%; /* 改为100%高度 */
  object-fit: cover;
}

.card-title {
  position: absolute;
  top: 60%; /* 调整位置 */
  left: 20px; /* 靠左对齐 */
  transform: translateY(-50%);
  font-size: 26px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  z-index: 1;
  white-space: nowrap;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.card-item:hover .card-title {
  font-size: 28px;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.card-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 0;
}

.banner-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 0;
}

.card-item:hover::after {
  background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
}

/* 添加星星评分样式 */
.stars {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-100%);
  color: gold;
  font-size: 20px;
  z-index: 1;
}

/* 添加模型标签样式 */
.model-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  z-index: 1;
}
</style>

<style scoped>
/* 新增弹窗全局样式 */
:deep(.knowledge-dialog) {
  border-radius: 12px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

:deep(.knowledge-dialog .el-dialog__header) {
  border-bottom: 1px solid #ebeef5;
  padding: 20px;
  margin-right: 0;
}

:deep(.knowledge-dialog .el-dialog__title) {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

/* 优化知识库卡片样式 */
.knowledge-library-container {
  padding: 10px 20px;
}

.knowledge-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #ebeef5;
}

.knowledge-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-color: #409eff;
}

.knowledge-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.knowledge-count {
  background: #f5f7fa;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.knowledge-desc {
  color: #606266;
  line-height: 1.6;
  margin: 12px 0 20px;
}

/* 优化按钮样式 */
:deep(.el-button--primary) {
  padding: 8px 16px;
  border-radius: 6px;
}
</style>

<style scoped>
/* 修改弹窗标题样式 */
:deep(.knowledge-dialog .el-dialog__header) {
  background: linear-gradient(90deg, #409eff, #337ecc);
  color: white;
  border-radius: 12px 12px 0 0;
  padding: 16px 24px;
  margin-right: 0;
}

:deep(.knowledge-dialog .el-dialog__title) {
  font-size: 18px;
  font-weight: 500;
  color: white;
  letter-spacing: 1px;
}

/* 移除关闭按钮 */
:deep(.knowledge-dialog .el-dialog__headerbtn) {
  display: none;
}
</style>
