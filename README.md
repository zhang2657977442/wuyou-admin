# 招聘小程序无忧直聘(管理端)

:star:此项目采用 React+Ant Design+Ant Design Pro 等技术开发，建议使用 Visual Studio Code 打开，适合学习\二次开发等用途。

## 项目列表

- [无忧直聘前端(Uni-app+Vue2)](https://github.com/zhang2657977442/wuyou-frontend)
- [无忧直聘后端(Java+SpringBoot2+MybatisPlus+Mysql)](https://github.com/zhang2657977442/wuyou-backend)
- [无忧直聘管理端(React+Ant Design+Ant Design Pro)](https://github.com/zhang2657977442/wuyou-admin)

## 项目截图

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-admin/%E6%88%AA%E5%9B%BE1.png) ![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-admin/%E6%88%AA%E5%9B%BE2.png)![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-admin/%E6%88%AA%E5%9B%BE3.png)

## 运行步骤

- 启动[无忧直聘后端服务](https://github.com/zhang2657977442/wuyou-backend)

- 在user表中插入一条管理员账号数据（账号密码都为admin，也可以自行修改）如下：

  ```mysql
  INSERT INTO `user`(`id`, `open_id`, `username`, `password`, `mobile`, `avatar`, `role`, `company_id`, `enable_status`, `auth_id`, `register_date`) VALUES ('88888888', NULL, 'admin', 'admin', '11111111111', 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', 2, NULL, 1, NULL, 1670494650.700);
  ```

- 安装依赖

  ```bash
  npm install
  ```

  或

  ```bash
  yarn
  ```

- 启动项目

  ```bash
  npm run dev
  ```

  或

  ```bash
  yarn dev
  ```

- 访问 http://localhost:8000 (默认8000，如果被占用，8001...8002...)

## 开源不易 谢谢支持

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/other/%E8%B5%9E%E8%B5%8F%E7%A0%81.jpg)

如有问题请联系

- QQ：2657977449
- 微信：zhang2657977449
