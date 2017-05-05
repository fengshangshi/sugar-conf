/**
 * @file 测试代码，单元测试用
 * @author ss.feng
 */
'use strict'

const Conf = require('.');

let conf = new Conf('./test');
console.log(conf.config);
