## [⭐学习视频看这里⭐](https://gitee.com/mldong/mldong-vben5#学习视频)

## ⭐注意事项⭐

1. 完整版的演示为antd版
2. 当前开源内容只有系统设置和在线开发模块
3. 工作流模块暂无开源计划。如需获取该模块或了解更多相关信息，请直接联系作者

## 简介

mldong-vben5基于vben5的快速开发框架前端工程

## 特性

- **最新技术栈**：使用 Vue3/vite 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：提供多套主题色彩，可配置自定义主题
- **国际化**：内置完善的国际化方案
- **权限** 内置完善的动态路由权限生成方案

## 演示地址(apifox云mock版)

- [antd-vben5](https://www.mldong.com/?nav=onlinedemo-2)
- [ele-vben5](https://www.mldong.com/?nav=onlinedemo-3)
- [naive-vben5](https://www.mldong.com/?nav=onlinedemo-4)

测试账号: admin/123456

## 文档

[文档地址](https://doc.mldong.com/mldong/front-pro/pro-explain.html/)

## 安装使用

- 获取项目代码

```bash
git clone https://gitee.com/mldong/mldong-vben5.git
```

- 安装依赖

```bash
cd mldong-vben

corepack enable

pnpm install
```

- 修改代理地址apps/web-antd/vite.config.mts

```ts
import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      nitroMock: false,
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'https://apifox-plus.mldong.com/m1/3323228-2823297-default',
            ws: true,
          },
        },
      },
    },
  };
});
```

- 运行

```bash
# antd版本
pnpm dev:antd
# ele版本
pnpm dev:ele
# naive版本
pnpm dev:naive
```

- 打包

```bash
# antd版本
pnpm build:antd
# ele版本
pnpm build:ele
# naive版本
pnpm build:naive
```

## 相关项目

- [配套后端-java版](https://gitee.com/mldong/mldong)
- [配套后端-python版](https://gitee.com/mldong666/mldong-python)
- [配套后端-nodejs版](https://gitee.com/mldong/mldong-koa)
- [vben5文档](https://doc.mldong.com/mldong/front-pro/pro-explain.html)

## 学习视频

- 第一章·基础篇
  - [环境准备](https://www.bilibili.com/cheese/play/ep1171719)
  - [体验thin版](https://www.bilibili.com/cheese/play/ep1171720)
  - [体验v5版本](https://www.bilibili.com/cheese/play/ep1171721)
  - [体验v2版本](https://www.bilibili.com/cheese/play/ep1171722)
  - [路由初探](https://www.bilibili.com/cheese/play/ep1171723)
  - [使用Apifox定义接口](https://www.bilibili.com/cheese/play/ep1171724)
  - [更换Apifox接口地址](https://www.bilibili.com/cheese/play/ep1171725)
- 第二章·骨架调整篇
  - [登录页调整](https://www.bilibili.com/cheese/play/ep1171726)
  - [登录接口联调](https://www.bilibili.com/cheese/play/ep1171727)
  - [请求全局响应处理](https://www.bilibili.com/cheese/play/ep1171728)
  - [用户信息接口联调](https://www.bilibili.com/cheese/play/ep1171729)
  - [用户权限码接口联调](https://www.bilibili.com/cheese/play/ep1171730)
  - [权限之前端访问控制](https://www.bilibili.com/cheese/play/ep1171731)
  - [权限之前端访问控制优化](https://www.bilibili.com/cheese/play/ep1171732)
  - [权限之后端访问控制](https://www.bilibili.com/cheese/play/ep1171733)
  - [修复登录时权限码接口重复调用bug](https://www.bilibili.com/cheese/play/ep1171734)
  - [按钮级权限之组件方式](https://www.bilibili.com/cheese/play/ep1171735)
  - [按钮级权限之API方式](https://www.bilibili.com/cheese/play/ep1171736)
  - [按钮级权限之指令方式](https://www.bilibili.com/cheese/play/ep1171737)
- 第三章·组件·弹窗篇
  - [Modal初探](https://www.bilibili.com/cheese/play/ep1171738)
  - [Modal数据共享](https://www.bilibili.com/cheese/play/ep1171739)
  - [Drawer抽屉](https://www.bilibili.com/cheese/play/ep1171740)
- 第四章·组件·表单篇
  - [表单初探](https://www.bilibili.com/cheese/play/ep1171741)
  - [表单组件使用技巧](https://www.bilibili.com/cheese/play/ep1171750)
  - [表单组件内置控件和适配控件区别](https://www.bilibili.com/cheese/play/ep1171742)
  - [更新合并最新代码](https://www.bilibili.com/cheese/play/ep1171743)
  - [自定义表单控件](https://www.bilibili.com/cheese/play/ep1171744)
  - [表单赋值和取值api](https://www.bilibili.com/cheese/play/ep1171745)
  - [完整的表单提交逻辑](https://www.bilibili.com/cheese/play/ep1171746)
  - [表单栅格化布局](https://www.bilibili.com/cheese/play/ep1171747)
  - [表单Divider控件配置](https://www.bilibili.com/cheese/play/ep1171748)
  - [重写表单Divider控件样式](https://www.bilibili.com/cheese/play/ep1171749)
  - [升级到5.4.1版本·版本冲突处理](https://www.bilibili.com/cheese/play/ep1171792)
  - [重构自定义组件目录](https://www.bilibili.com/cheese/play/ep1171996)
  - [处理git版本Form2form大小写不敏感问题](https://www.bilibili.com/cheese/play/ep1171998)
  - [编辑表单·初探](https://www.bilibili.com/cheese/play/ep1172000)
  - [编辑表单·id字段处理](https://www.bilibili.com/cheese/play/ep1172003)
  - [表单字段动态显示隐藏](https://www.bilibili.com/cheese/play/ep1172006)
  - [表单focus和change使用说明](https://www.bilibili.com/cheese/play/ep1172420)
  - [表单change事件的另一种实现方式trigger](https://www.bilibili.com/cheese/play/ep1172421)
  - [表单dependencies详解](https://www.bilibili.com/cheese/play/ep1172422)
  - [表单校验rules配置](https://www.bilibili.com/cheese/play/ep1172430)
  - [ApiSelect自定义表单控件·初探](https://www.bilibili.com/cheese/play/ep1172431)
  - [ApiSelect等自定义表单控件迁移](https://www.bilibili.com/cheese/play/ep1172432)
  - [ApiSelect表单控件api-result-label](https://www.bilibili.com/cheese/play/ep1172825)
  - [ApiSelect表单控件·params请求参数](https://www.bilibili.com/cheese/play/ep1172826)
  - [ApiTreeSelect表单控件配置](https://www.bilibili.com/cheese/play/ep1172827)
  - [ApiDict字典控件配置](https://www.bilibili.com/cheese/play/ep1172831)
  - [formApi.updateSchema更新formSchema](https://www.bilibili.com/cheese/play/ep1173185)
  - [formApi.setState更新schema等属性](https://www.bilibili.com/cheese/play/ep1173186)
  - [表单组件篇小结](https://www.bilibili.com/cheese/play/ep1173187)
- 第五章·组件·vxe-table篇
  - [vxe-table组件·初探](https://www.bilibili.com/cheese/play/ep1173333)
  - [vxe-table组件·左右侧按钮](https://www.bilibili.com/cheese/play/ep1173335)
  - [vxe-table组件·分页接口配置](https://www.bilibili.com/cheese/play/ep1173337)
  - [vxe-table组件·非分页接口配置](https://www.bilibili.com/cheese/play/ep1173339)
  - [vxe-table组件·树形层级结构接口配置](https://www.bilibili.com/cheese/play/ep1173338)
  - [vxe-table组件·树形平级结构(id-pid)接口配](https://www.bilibili.com/cheese/play/ep1173348)
  - [vxe-table组件·用户列定义](https://www.bilibili.com/cheese/play/ep1189024)
  - [自定义渲染列·插槽式](https://www.bilibili.com/cheese/play/ep1189025)
  - [自定义渲染列·配置式·自定义渲染器](https://www.bilibili.com/cheese/play/ep1189027)
  - [自定义渲染列·字典组件](https://www.bilibili.com/cheese/play/ep1189028)
  - [自定义渲染列·字典组件缓存优化](https://www.bilibili.com/cheese/play/ep1189029)
  - [自定义渲染列·ApiSelect组件](https://www.bilibili.com/cheese/play/ep1189030)
  - [自定义渲染列·ApiTreeSelect组件](https://www.bilibili.com/cheese/play/ep1189031)
  - [自定义渲染列·ApiRadioGroup和ApiCheckbox](https://www.bilibili.com/cheese/play/ep1190646)
  - [行操作·初探](https://www.bilibili.com/cheese/play/ep1190647)
  - [行操作·删除](https://www.bilibili.com/cheese/play/ep1190648)
  - [grid对象简单说明](https://www.bilibili.com/cheese/play/ep1190649)
  - [行操作按钮权限](https://www.bilibili.com/cheese/play/ep1190650)
  - [TableAction组件](https://www.bilibili.com/cheese/play/ep1190651)
  - [TableAction组件权限码](https://www.bilibili.com/cheese/play/ep1190657)
  - [TableAction组件下拉更](https://www.bilibili.com/cheese/play/ep1190668)
  - [TableAction组件下拉图标错位bug](https://www.bilibili.com/cheese/play/ep1190969)
  - [完整版的CRUD模板布局](https://www.bilibili.com/cheese/play/ep1190970)
  - [表格多选事件交互处理](https://www.bilibili.com/cheese/play/ep1190971)
  - [批量删除逻辑处理](https://www.bilibili.com/cheese/play/ep1190972)
  - [vxe-table组件·搜索表单](https://www.bilibili.com/cheese/play/ep1190973)
  - [vxe-table组件·本章小结](https://www.bilibili.com/cheese/play/ep1190974)
- 第六章·组件·详情篇
  - [descriptions详情组件·初探](https://www.bilibili.com/cheese/play/ep1191150)
  - [descriptions详情组件·回显组件的使用](https://www.bilibili.com/cheese/play/ep1191151)
  - [descriptions详情组件·使用表单元数据渲染](https://www.bilibili.com/cheese/play/ep1191152)
  - [表单元数据增加detailSpan和ifDetail配置项](https://www.bilibili.com/cheese/play/ep1191154)
  - [descriptions详情组件·完整版](https://www.bilibili.com/cheese/play/ep1191155)
  - [descriptions详情组件·详情接口联调](https://www.bilibili.com/cheese/play/ep1191157)
  - [descriptions详情组件·详情字段动态显示控制](https://www.bilibili.com/cheese/play/ep1192376)
- 第七章·实战案例(一)
  - [Vben内置表单进阶·登录表单增加图片验证码(一)](https://www.bilibili.com/cheese/play/ep1192410)
  - [Vben内置表单进阶·登录表单增加图片验证码(二)](https://www.bilibili.com/cheese/play/ep1192421)
  - [Vben内置表单进阶·登录表单增加图片验证码(三)](https://www.bilibili.com/cheese/play/ep1192422)
  - [Vben内置表单进阶·登录表单增加图片验证码(四)](https://www.bilibili.com/cheese/play/ep1192423)
  - [Vben内置表单进阶·登录表单增加图片验证码(五)](https://www.bilibili.com/cheese/play/ep1192424)
  - [6.6Vben内置表单进阶·登录表单增加图片验证码(六)](https://www.bilibili.com/cheese/play/ep1220962)
- 第八章·实战案例(二)
  - [手机号+短信验证码登录(一)](https://www.bilibili.com/cheese/play/ep1203846)
  - [手机号+短信验证码登录(二)](https://www.bilibili.com/cheese/play/ep1203847)
  - [手机号+短信验证码登录(三)](https://www.bilibili.com/cheese/play/ep1203848)
  - [手机号+短信验证码登录(四)](https://www.bilibili.com/cheese/play/ep1203849)
- 第九章·实战案例(三)
  - [头像上传(一)](https://www.bilibili.com/cheese/play/ep1245551)
  - [头像上传(二)](https://www.bilibili.com/cheese/play/ep1245563)
  - [头像上传(三)](https://www.bilibili.com/cheese/play/ep1245565)
  - [头像上传(四)](https://www.bilibili.com/cheese/play/ep1245567)
  - [头像上传(五)](https://www.bilibili.com/cheese/play/ep1245570)
  - [头像上传(六)](https://www.bilibili.com/cheese/play/ep1245572)
  - [头像上传(七)·回显](https://www.bilibili.com/cheese/play/ep1288994)
- 第十章·实战案例(四)
  - [个人中心·入口处理](https://www.bilibili.com/cheese/play/ep1254301)
  - [个人中心·基本布局](https://www.bilibili.com/cheese/play/ep1256522)
  - [个人中心·详情组件支持render配置](https://www.bilibili.com/cheese/play/ep1256523)
  - [个人中心·更新头像](https://www.bilibili.com/cheese/play/ep1256524)
  - [个人中心·基本设置](https://www.bilibili.com/cheese/play/ep1256525)
  - [个人中心·修改密码](https://www.bilibili.com/cheese/play/ep1256526)
  - [个人中心·在线设备](https://www.bilibili.com/cheese/play/ep1256528)
- 第十一章·实战案例(五)
  - [双下拉选择联动·静态数据版](https://www.bilibili.com/cheese/play/ep1275571)
  - [双下拉选择联动·动态数据](https://www.bilibili.com/cheese/play/ep1275572)
- 第十二章·实战案例(六)
  - [上传组件封装·初探](https://www.bilibili.com/cheese/play/ep1289406)
  - [上传组件封装·基础布局](https://www.bilibili.com/cheese/play/ep1289407)
  - [上传组件封装·属性绑定](https://www.bilibili.com/cheese/play/ep1289408)
  - [上传组件封装·接口配置](https://www.bilibili.com/cheese/play/ep1289409)
  - [上传组件封装·v-model实现](https://www.bilibili.com/cheese/play/ep1289410)
  - [上传组件封装·编辑回显](https://www.bilibili.com/cheese/play/ep1289411)
  - [上传组件封装·删除事件](https://www.bilibili.com/cheese/play/ep1289412)
  - [上传组件封装·详情回显](https://www.bilibili.com/cheese/play/ep1289413)
- 第十三章·实战案例(七)
  - [商品库存一对多表单·初探](https://www.bilibili.com/cheese/play/ep1296696)
  - [商品库存一对多表单·创建表单和库存控件](https://www.bilibili.com/cheese/play/ep1296697)
  - [商品库存一对多表单·库存控件中使用表单组件](https://www.bilibili.com/cheese/play/ep1296698)
  - [商品库存一对多表单·库存控件v-model实现](https://www.bilibili.com/cheese/play/ep1296699)
  - [商品库存一对多表单·库存控件v-model优化](https://www.bilibili.com/cheese/play/ep1296700)
  - [商品库存一对多表单·库存控件·动态添加](https://www.bilibili.com/cheese/play/ep1296701)
  - [商品库存一对多表单·库存控件·动态删除](https://www.bilibili.com/cheese/play/ep1296702)
  - [商品库存一对多表单·库存控件多表单方式](https://www.bilibili.com/cheese/play/ep1296703)
  - [商品库存一对多表单·库存控件多表单动态增删](https://www.bilibili.com/cheese/play/ep1296704)
  - [商品库存一对多表单·库存控件编辑回显](https://www.bilibili.com/cheese/play/ep1296705)
  - [商品库存一对多表单·库存控件·修复增删逻辑bug](https://www.bilibili.com/cheese/play/ep1299834)
  - [商品库存一对多表单·库存控件·数据校验](https://www.bilibili.com/cheese/play/ep1300272)
  - [商品库存一对多表单·库存控件·自定义ref](https://www.bilibili.com/cheese/play/ep1300279)
  - [商品库存一对多表单·库存控件·自定义ref调用多表单校](https://www.bilibili.com/cheese/play/ep1300281)
  - [商品库存一对多表单·库存控件·disabled属性](https://www.bilibili.com/cheese/play/ep1300292)
  - [商品库存一对多表单·库存控件·详情回显·初探](https://www.bilibili.com/cheese/play/ep1307433)
  - [商品库存一对多表单·库存控件·详情回显·实现](https://www.bilibili.com/cheese/play/ep1307434)

持续更新中……

## 更新日志

[CHANGELOG](https://gitee.com/mldong/mldong-vben5/commits/master)

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://gitee.com/mldong/mldong-vben5/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feature/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feature/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 维护者

[mldong](https://gitee.com/mldong666)
