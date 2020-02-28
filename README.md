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

### 组件设计

```
components
├── blankPage.tsx #空白页
├── blockButton.tsx 块状按钮
├── commonHeader.tsx #公用头部
├── commonList.tsx #公用的滚动列表
├── commonTab.tsx #公用的tab
├── customSvg.tsx #公用的svg生成组件
├── listFooter.tsx #列表底部加载显示器
├── loading.tsx #页面加载是loading指示器
├── radiusButton.tsx #圆形按钮
├── toast.tsx #公用的toast
└── unScalingText.tsx #不允许系统放大的字体Text组件
```

单独将滚动列表的设计：

```js
interface ICommonList {
  requestFunc: params => Promise<any>;
  renderItem: (item: any, index: number) => React.ReactElement;
  renderHeader?: () => React.ReactElement;
  renderIndicator?: () => React.ReactElement;
  isRefreshControlShow?: boolean;
  isBlankInfoBtnShow?: boolean;
  isItemSeparatorShow?: boolean;
  isIndicatorShow?: boolean;
  blankBtnMessage?: string;
  offset: number;
  extraParams?: object;
  getCount?: (x: number) => void;
  getRawData?: (x: object) => void; // 获取最原始的列表数据
  getScrollTop?: (x: number) => void; //获取滚动高度
  style?: object;
  errorCallback?: () => void;
}
```

通过 props 对请求 api，renderItem 等方法重写封装加载 list，具体实现请参考 components/commonList

### store 设计

使用 mobx 进行 store 设计，实现用户信息存储，多语言功能。  
简述：

- 用户详情
  - 用户登录后将登录信息存储到 asyncStorage 和 mobx 中，页面通过 inject 获取 mobx 中的用户信息
  - 请求 api 之前获取缓存中的 token 加载 header 上
  - 再次进入 app，从缓存中读取数据直接设置到 mobx 的用户详情中
- 多语言
  - 用户通过读取手机系统语言环境初始化语言，存入缓存设置到 mobx 中
  - 用户手动修改语言，存入缓存设置到 mobx 中

### 无限滚动设计

根据滚动加载的原理，设置列表底部指示器，四种状态分别是：无数据、无更多数据、加载失败，点击重试和加载中。

- 首次加载没数据，显示 blankPage 组件
- 加载失败，点击重试，点击后重新将状态设为 loading 中，重新调用接口请求数据
- 加载成功，还有更多，将新的数据合并到 list 里，将 offset 增加等待下一次触发
- 加载没有更多的，显示无更多数据  
  技术要点
- scrollEventThrottle 设置底部触发时间距离

### 完整性

✅ 完成登录、列表页(及筛选器)的 100%功能  
✅ 完成详情页 100%功能  
✅ 完成我的页 100%功能  
✅ 多语言功能设计  
✅ 列表页(及筛选器)的全部样式

### 兼容性

✅ 兼容 iPhone 所有机型  
✅ 兼容 Android 大部分机型

### 额外

✅ 列表添加滚动到底部按钮  
✅ toast 和侧边栏动画设计  
✅ 详情页锚点滚动设置  
✅ 对登录页输入框进行了 KeyboardAvoidingView 滚动包裹

### 预览

<img src="./display/gif1.gif" width="300"/>
