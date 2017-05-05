/**
 * @file 测试代码，单元测试用
 * @author ss.feng
 */
'use strict'

const Conf = require('.');

let confWithIgnore = new Conf('./test', 'index');
console.log(confWithIgnore.config);

let conf = new Conf('./test');
console.log(conf.config);
