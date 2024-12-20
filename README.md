# ✌️ 超星学习通自动签到

整个自动签到，在家安稳睡觉。
## 技术栈

本项目使用 TypeScript Koa Puppeteer 实现。

## 开始

### 安装依赖

> 本项目使用 `yarn` 进行依赖管理

```bash
yarn install
```

### 开发调试

因为 nodemon + ts-node 会有各种奇怪的问题。

目前本项目采用 tsc -w + nodemon ./dist 进行调试。

分别在两个 terminal 中执行
```bash
tsc -w
yarn dev
```

### 使用方式

url: localhost:3000
path: '/'

Request Headers

Method: POST
Content-Type: application/json

Request Body
```json
{
	"username": "13800001234", // 账号：请使用手机号。不要使用学号！
	"password": "password" // 你的密码
}
```

## 部署上线

```bash
tsc
yarn start
```

## License

MIT@Wzb3422
