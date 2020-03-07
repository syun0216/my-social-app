### 设计文档

### 安装

```bash
# 全局安装expo
npm install --global expo-cli
# 项目根目录运行
npm install 或者 yarn install
```

### 运行

配置 react-native 环境，安装 expo 相关 cli

```bash
expo start
```

### 组件

```
components
├── blankPage.tsx #空白页
├── blockButton.tsx 块状按钮
├── commonHeader.tsx #公用头部
├── commonList.tsx #公用的滚动列表
├── commonTab.tsx #公用的tab
├── customSvg.tsx #公用的svg生成组件
├── errorPage.tsx #公用的errorPage
├── icon.tsx #图标
├── index.ts #export组件
├── iPhoneXAboveModelWrapper.tsx #计算iPhonex机型的头部和底部
├── icon.tsx #图标
├── listFooter.tsx #列表底部加载显示器
├── loading.tsx #页面加载是loading指示器
├── radiusButton.tsx #圆形按钮
├── toast.tsx #公用的toast
└── unScalingText.tsx #不允许系统放大的字体Text组件

✅ 登录、列表页(及筛选器)的 100%功能
✅ 详情页 100%功能
✅ 我的页 100%功能
✅ 多语言功能设计
✅ 列表页(及筛选器)的全部样式

### 兼容性

✅ 兼容 iPhone 所有机型
✅ 兼容 Android 大部分机型
```
