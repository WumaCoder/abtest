# abtest

一个预防测试代理环境。

## 特性

- [x] 命令方式
- [x] 配置创建

## 安装

```
npm i -g abtest
```

## 使用

### 初始化

```
abtest init [--force]
# --force 强制
```

### 创建代理服务器

```
abtest serve <serveName> [--port=3000] [--signal=start|stop]
```

### 代理服务

```
abtest link [serveName] [--port=3002]
# 连接到serveName服务
# 我们可以直接创建 `abtest.config.js` 来写入配置
```

## 配置

我们在项目里创建 `abtest.config.js` 配置文件

```js
module.exports = {
  serve: "qxg-app",
  name: "test1",
  port: 3002,
};
```

> 这个例子是将创建一个代理连接到 qxg-app，name 是 test1 ，代理端口号是 8080

## 设置头

完成上面后，我们需要在前端的请求库设置 `headers['x-abtest'] = 'test1'` 来进行代理。

## 关于

MIT
