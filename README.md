# 守护健康吧咩爸！H5 MVP

第一版按 iPhone 移动端 H5 标准制作，优先适配：

- iPhone SE: 375 x 667
- iPhone 12/13/14/15: 390 x 844
- iPhone 14/15 Pro Max: 430 x 932

设计约束：

- 页面最大宽度 430px，居中显示
- 主要操作按钮不低于 44px
- 底部导航适配 iPhone 安全区
- 支持添加到主屏幕的基础 PWA 元信息
- 首页即展示身体负担、今日目标、守住进度、今日记录和新闻警戒

本地预览：

```bash
python3 -m http.server 4173
```

然后用浏览器打开：

```text
http://localhost:4173
```
