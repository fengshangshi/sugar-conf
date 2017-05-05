# sugar-conf
sugar2.0框架的配置文件管理组件

## 如何使用

### API

```
const Conf = require('sugar-conf');
const configure = new Conf('./conf');
console.log(configure.config); 
```

该配置文件管理只是处理TOML文件

### 忽略节点
默认是对config这个文件名忽略生成JSON的节点，这个名字可以修改，在初始化对象时候。

```
// 例如conf/ral/index.toml文件中有个a = 1，后续访问就用config.ral.a
// 如果不是忽略'index'的话，就需要这样访问：config.ral.index.a
const configure = new Conf('./conf', 'index');
```
