### 设计文档

### 安装

```bash
npm install 或者 yarn install
```

### 运行

配置react-native 环境，安装expo相关cli

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
interface ICommonList{
  requestFunc: (params) => Promise<object>,
  renderItem: () => React.ReactElement,
  renderHeader?: () => React.ReactElement,
  renderIndicator?: () => React.ReactElement,
  isRefreshControlShow?: boolean,
  isBlankInfoBtnShow?: boolean,
  isItemSeparatorShow?: boolean,
  isIndicatorShow?: boolean,
  blankBtnMessage?: string,
  offset: number,
  extraParams?: object,
  getCount?: (number) => void,
  getRawData?: (object) => void, // 获取最原始的列表数据
  getScrollTop?: (number) => void, //获取滚动高度
  style?: object,
  errorCallback?: () => void
}
```

通过props对请求api，renderItem等方法重写封装加载list，具体实现请参考components/commonList

### store设计
使用mobx进行store设计，实现用户信息存储，多语言功能。  
简述：  
- 用户详情
  - 用户登录后将登录信息存储到asyncStorage和mobx中，页面通过inject获取mobx中的用户信息
  - 请求api之前获取缓存中的token加载header上
  - 再次进入app，从缓存中读取数据直接设置到mobx的用户详情中
- 多语言
  - 用户通过读取手机系统语言环境初始化语言，存入缓存设置到mobx中
  - 用户手动修改语言，存入缓存设置到mobx中

### 无限滚动设计

根据滚动加载的原理，设置列表底部指示器，四种状态分别是：无数据、无更多数据、加载失败，点击重试和加载中。
- 首次加载没数据，显示blankPage组件
- 加载失败，点击重试，点击后重新将状态设为loading中，重新调用接口请求数据
- 加载成功，还有更多，将新的数据合并到list里，将offset增加等待下一次触发
- 加载没有更多的，显示无更多数据

### 完整性

✅完成登录、列表页(及筛选器)的100%功能  
✅完成详情页100%功能  
✅完成我的页100%功能  
✅多语言功能设计  

### 兼容性

✅兼容iPhone所有机型  
✅兼容Android大部分机型  

### 额外

✅列表添加滚动到底部按钮  
✅toast和侧边栏动画设计  
✅详情页锚点滚动设置  
✅对登录页输入框进行了KeyboardAvoidingView滚动包裹  

### 预览

<img src="./display/gif1.gif" style="width: 100%"/>