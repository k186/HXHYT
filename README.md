# HXHYYT

全部逻辑走的微信渠道,APP 渠道涉及密码加密无法处理。

* 目前看 localStorage 存有token 和 cardList


## 获取token

* 客户端版本微信打开华医通并且登陆
* 设置switchHost 如下

```shell
127.0.0.1 hx5g.cd120.info

```

* 启动获取token程序,将获取的信息复制出来,数据结构如下

```javascript
{
    token:"",
    cardList:[
    {
      cardId:"",
      name:""
    }
  ]
}

```

* 将token 和需要使用的cardId 填入到准备页面对应项
* 选择医生
* 确认预约信息
* 开启自动预约

## H5已知token 使用
```javascript
使用此地址登陆后可以直接在网页使用
=
```

## wx 登陆

```javascript


```


