# 智能小车产品展示官网

基于 Tailwind CSS + HTML5 + JavaScript 开发的科技感智能小车产品展示官网，支持手机/电脑自适应，可直接部署到 Netlify。

## 项目结构

```
intnet/
├── assets/          # 图片资源目录（预留）
├── css/             # 全局样式文件
│   └── style.css    # Tailwind配置 + 自定义样式
├── js/              # 交互脚本
│   └── main.js      # 轮播、表单、弹窗、滚动效果等
├── index.html       # 首页
├── product.html     # 产品详情页
├── feature.html     # 功能优势对比页
├── case.html        # 成果案例页
├── about.html       # 项目介绍页
├── contact.html     # 咨询联系页
└── README.md        # 操作文档
```

## 一、本地预览运行步骤

### 方式一：直接打开HTML文件（推荐）

1. 下载或克隆项目到本地
2. 使用浏览器直接打开 `index.html` 文件
3. 即可预览网站内容

**注意**：直接打开HTML文件时，部分浏览器可能会限制某些JavaScript功能（如本地存储），但基本功能均可正常使用。

### 方式二：使用本地服务器（推荐用于完整功能测试）

#### 使用 Python 开启本地服务器

```bash
# Python 3
cd intnet
python -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000`

#### 使用 Node.js 开启本地服务器

```bash
# 全局安装 http-server
npm install -g http-server

# 启动服务器
cd intnet
http-server -p 8000
```

然后在浏览器中访问 `http://localhost:8000`

#### 使用 Live Server（VS Code 扩展）

1. 在 VS Code 中安装 `Live Server` 扩展
2. 右键点击 `index.html` 文件
3. 选择 `Open with Live Server`
4. 浏览器会自动打开预览页面

## 二、Netlify 一键部署教程

### 准备工作

1. 拥有 GitHub 账号（如果没有，请先注册：https://github.com/）
2. 拥有 Netlify 账号（如果没有，请先注册：https://www.netlify.com/）

### 部署步骤

#### 第一步：将项目上传到 GitHub

1. 登录 GitHub
2. 点击右上角 `+` 号，选择 `New repository`
3. 填写仓库名称（如：smart-car-website）
4. 选择 `Public`（公开仓库）
5. 点击 `Create repository`
6. 将项目文件上传到该仓库（可以使用 Git 命令或直接上传文件）

#### 第二步：在 Netlify 中授权并部署

1. 登录 Netlify（https://app.netlify.com/）
2. 点击右上角 `New site from Git`
3. 选择 `GitHub` 作为 Git 提供商
4. **GitHub 授权页面操作**：
   - 如果是第一次授权，会跳转到 GitHub 授权页面
   - 点击 `Authorize Netlify` 按钮
   - 选择要授权的账号（个人账号或组织）
   - 确认授权范围，点击 `Authorize`
5. 授权成功后，返回 Netlify
6. 在仓库列表中选择刚才创建的仓库（smart-car-website）
7. 配置部署选项：
   - **Branch to deploy**：选择 `main` 或 `master`
   - **Build command**：留空（静态网站无需构建）
   - **Publish directory**：留空（根目录即为发布目录）
8. 点击 `Deploy site`
9. Netlify 会自动开始部署，等待几分钟
10. 部署完成后，会显示网站地址（如：https://xxx.netlify.app）

#### 第三步：自定义域名（可选）

1. 在 Netlify 站点设置中找到 `Domain management`
2. 可以使用 Netlify 提供的默认域名，或添加自定义域名
3. 如果添加自定义域名，需要在域名服务商处配置 DNS 解析

### 部署成功验证

1. 访问部署后的网站地址
2. 检查所有页面是否正常加载
3. 测试导航栏、轮播图、表单等交互功能

## 三、网站修改指南

### 1. 替换小车图片

所有图片使用的是在线生成的示例图片，您可以替换为真实产品图片。

**步骤**：

1. 将真实图片放入 `assets/` 目录
2. 打开相应的 HTML 文件
3. 找到 `<img>` 标签的 `src` 属性
4. 将在线图片URL替换为本地图片路径，例如：

```html
<!-- 替换前 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20robot%20car&image_size=landscape_16_9" alt="智能小车">

<!-- 替换后 -->
<img src="assets/car-main.jpg" alt="智能小车">
```

### 2. 修改产品参数文字

#### 修改首页内容

打开 `index.html`，找到相应的文本内容进行修改：

```html
<!-- 修改核心功能卡片标题 -->
<h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">自动避障</h3>

<!-- 修改产品亮点描述 -->
<p class="text-gray-600 dark:text-gray-400">
  5路红外避障传感器，全方位检测障碍物
</p>
```

#### 修改产品详情页参数

打开 `product.html`，找到技术参数表格进行修改：

```html
<!-- 修改参数表格内容 -->
<tr>
  <td><strong>整车尺寸</strong></td>
  <td>长220mm × 宽160mm × 高100mm</td>
  <td>不含传感器伸出部分</td>
</tr>
```

#### 修改功能对比数据

打开 `feature.html`，找到对比表格进行修改：

```html
<tr>
  <td><strong>避障精度</strong></td>
  <td class="text-green-600">5路红外传感器</td>
  <td class="text-red-500">1-2路传感器</td>
  <td>多方位检测，盲区小</td>
</tr>
```

#### 修改联系信息

打开 `contact.html`，找到联系方式部分进行修改：

```html
<!-- 修改电话 -->
<p class="text-gray-600 dark:text-gray-400 mt-1">400-123-4567</p>

<!-- 修改邮箱 -->
<p class="text-gray-600 dark:text-gray-400 mt-1">support@smartcar.com</p>
```

### 3. 修改颜色主题

打开 `css/style.css`，修改 CSS 变量：

```css
:root {
  --primary-color: #1e3a5f;      /* 主色调 */
  --primary-light: #2d4a6f;     /* 主色调浅色 */
  --secondary-color: #3b82f6;   /* 次要颜色 */
  --accent-color: #06b6d4;      /* 强调色 */
}
```

### 4. 修改网站标题和描述

打开各个 HTML 文件的 `<head>` 部分：

```html
<title>差速转向自动避障智能小车 - 首页</title>
<meta name="description" content="基于Arduino的差速转向自动避障智能小车...">
```

### 5. 修改页脚版权信息

打开各个 HTML 文件的页脚部分：

```html
<p class="text-gray-500">
  © 2024 智能小车科技. All rights reserved.
</p>
```

## 四、功能特性

### 已实现功能

- ✅ 顶部固定导航栏，滚动时渐变效果
- ✅ 移动端汉堡折叠菜单
- ✅ 页面平滑滚动
- ✅ 按钮 hover 渐变高亮
- ✅ 图片淡入加载动画
- ✅ 全屏产品轮播 Banner
- ✅ 深色/浅色模式切换
- ✅ 产品图片点击弹窗放大
- ✅ 在线留言表单（带前端验证）
- ✅ FAQ 问答折叠面板
- ✅ 响应式布局（支持手机/平板/电脑）

### 页面结构

1. **首页**：轮播 Banner、核心功能卡片、产品亮点、案例预览
2. **产品详情页**：多角度展示、硬件参数、元器件拆解、差速转向原理、避障逻辑、代码介绍
3. **功能对比页**：对比表格、性能雷达图、拓展能力展示
4. **成果案例页**：竞赛获奖案例、搭建调试过程、答辩展示
5. **项目介绍页**：开发背景、设计目标、开发周期、研发团队
6. **咨询联系页**：在线留言、联系方式、FAQ 问答

## 五、技术栈

- **HTML5**：语义化标签
- **Tailwind CSS 3**：原子化 CSS 框架（CDN 引入）
- **JavaScript**：原生 JS 实现交互功能
- **Font Awesome**：图标库（CDN 引入）

## 六、浏览器兼容性

- Chrome（推荐）
- Firefox
- Safari
- Edge
- IE 11（部分功能可能受限）

## 七、注意事项

1. 所有图片使用的是在线生成的示例图片，正式使用时请替换为真实产品图片
2. 表单提交为前端模拟，如需后端处理请自行添加
3. 深色模式使用 CSS 变量和 prefers-color-scheme 实现
4. 网站为纯静态页面，无需后端服务器即可运行

## 八、许可证

MIT License
