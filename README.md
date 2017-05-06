# sugar-conf
sugar2.0框架的配置文件管理组件

## 如何使用

### API

```
const Conf = require('sugar-conf');
const configure = new Conf('./conf');
console.log(configure.config); 
```

PS：该组件只处理所有toml文件

### 忽略节点
默认是对config这个文件名忽略生成JSON的节点，这个名字可以修改，在初始化对象时候。

例如conf/ral/index.toml：

```
a = 1
```
忽略节点的访问方式：

```
const configure = new Conf('./conf', 'index');
console.log(configure.ral.a); // 1
```

不忽略的访问方式，需要显示的增加index节点：

```
const config = new Conf('./conf');
console.log(configure.ral.index.a); // 1
```
