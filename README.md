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
//https://hx5g.cd120.info/index.php?g=WapApi&m=WapApi&a=setLogin&gzh_type=2&openid=ocZagjrGdv4wpC-BAwREbyN_eU3s&token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzNTc5NTA0MTI2NjMyOTE5MDQyMzY1MTEzMjEyMzE0NDEiLCJpYXQiOjE2ODE5NTUyMTgsInN1YiI6IntcInVzZXJJZFwiOlwiMzU3OTUwNDEyNjYzMjkxOTA0XCIsXCJhY2NvdW50SWRcIjpcIjM1Nzk1MDQxMjY3MTY4MDUxMlwiLFwidXNlclR5cGVcIjowLFwiYXBwQ29kZVwiOlwiSFhHWUFQUFwiLFwiY2hhbm5lbENvZGVcIjpcIlBBVElFTlRfV0VDSEFUXCIsXCJkZXZpY2VudW1iZXJcIjpcIjIzNjUxMTMyMTIzMTQ0MVwiLFwiZGV2aWNlVHlwZVwiOlwiV1hfSDVcIixcImFjY291bnROb1wiOlwiMTg5ODAwNzAxMTVcIixcIm5hbWVcIjpcIuaYk-mbhFwiLFwiZG9jdG9ySWRcIjpudWxsLFwib3JnYW5Db2RlXCI6XCJISUQwMTAxXCJ9IiwiZXhwIjoxNjg0NTQ3MjE4fQ.UFoDMgaHyvwdxv4sANkCeUKm4zAWPMEuvJ4AGPMpnGo***HXGYAPP&registerMobile=18980070115&name=%E6%98%93%E9%9B%84

```

## wx 登陆

```javascript


```


