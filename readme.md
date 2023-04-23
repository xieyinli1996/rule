# Surge Key
* 自用规则备份  仅供参考不作他用

* 未经允许禁用转载与传播,此库仅为个人备份

## Rename 分为三个版本
* [rename.js](https://keywos.cf/rename.js) : 本地批量重命名 速度最快
* ##### 以下两个因为根据远程 `落地ip` 与 `入口ip` 去重, 需要查询ip-api, 所以速度可能慢点,根据节点数量需要数十秒以上,需耐心等待
* [renameip.js](https://keywos.cf/renameip.js) : ip-api入口与落地 去重后,批量重命名
* [reip.js](https://keywos.cf/reip.js) : ip-api入口与落地 去重

### 示例: 

```
https://keywos.cf/rename.js#clear

https://keywos.cf/rename.js#in=cn&out=us&clear

https://github.com/Keywos/rule/raw/main/rename.js#in=cn&out=us&clear&nx
 ```

- [`修改自`](https://github.com/qwerzl/rename.js) https://github.com/qwerzl/rename.js
* 在SubStore内对节点重命名为：地区 01 ...
* 过滤掉不规范命名的节点 例如 剩余,过期...
* SubStore内选择"脚本操作"，填写脚本地址
* 可配合argument一同使用。现支持参数：
* 节点批量重命名 全部为本地操作
   
## in：
* 机场原节点名, 默认cn 
* 例如 `in=cn` 香港 01 香港 02 ...

## out：
* 修改后节点名, 默认us
* 例如 `out=us` HK 01 HK 02 ...
* #### in&out 可选  `us, cn, quan`
* cn 中文地区名称 例如 香港
* us 英文地区名称 例如 HK
* quan 英文全地名 例如 Hong Kong

## name：
* 每个节点前面添加自义定机场名
* 例如 `name=KKK` KKK 香港 01 ...

## clear: 
* 如果一个地区只有一个节点，则去除它的"01"
* 过滤掉关键词里正则匹配的「无用」节点

```
(套餐|到期|有效|剩余|版本|已用|过期|失联|测试|官方|网址|备用|群|TEST)
```

## nx:
* 过滤掉高倍率 或者0.n倍 
* 可选: 加nx为过滤 不加为不过滤
  
```
(高倍|((?!.*(1|0\.\d))\d+倍|x|ˣ²|ˣ³|ˣ⁴|ˣ⁵|ˣ¹⁰)) 
```

## 测试 

| Rule | raw | io |
| :-----| :-----| :-----|
| DIRECT | [China](https://raw.githubusercontent.com/Keywos/rule/main/China.list) | [China](https://keywos.github.io/rule/China.list) |
| Proxy | [Proxy](https://raw.githubusercontent.com/Keywos/rule/main/Proxy.list) | [Proxy](https://keywos.github.io/rule/Proxy.list) |
| Team | [Team](https://raw.githubusercontent.com/Keywos/rule/main/Team.list) | [Team](https://keywos.github.io/rule/Team.list) |
| AD | [AD](https://raw.githubusercontent.com/Keywos/rule/main/AD.list) | [AD](https://keywos.github.io/rule/AD.list) | 