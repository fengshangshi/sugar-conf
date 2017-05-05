/**
 * @file TOML配置文件组件
 * @author ss.feng
 */
'use strict'

const path = require('path');
const type = require('sugar-type');
const toml = require('sugar-toml');

const Scan = require('./libs/Scan');


class Conf {
    constructor(path, ignore) {
        // 初始化扫描器，获得toml的文件列表
        const scan = new Scan({
            ext: '.toml',
            path: path,
        });

        this.files = scan.files;
        this.ignore = ignore || 'config';
    }

    __files2map() {
        let map = new Map();
        let files = this.files;

        Object.keys(files).forEach((i) => {
            let name = path.parse(i).name;

            // 对同一个目录下的文件进行排序
            if (map.has(files[i])) {
                if (name === this.ignore) {
                    // 如果是特殊文件，放在数组头部
                    map.get(files[i]).unshift(i);
                } else {
                    // 其他非特殊文件
                    map.get(files[i]).push(i);
                }
            } else {
                map.set(files[i], [i]);
            }
        });

        return map;
    }

    __map2array(map) {
        let array = [];
        let flag = 0;

        map.forEach((value, key) => {
            // 计算路径深度
            let count = key.split(/\//).filter((k) => {
                return k.length > 0;
            });

            // 数组合并前后的关系问题，通过flag对比
            array = count > flag ? array.concat(value) : value.concat(array);

            // 记录最新的路径深度
            flag = count;
        });

        return array;
    }


    __config() {
        let config = {};
        let files = this.__map2array(this.__files2map());

        files.forEach((file) => {
            let configure = {};
            let name = path.parse(file).name;

            if (name === this.ignore) {
                configure = toml.file2json(file);
            } else {
                configure[name] = toml.file2json(file);
            }

            config = Object.assign(config, configure);
        });

        return config;
    }

    set config(newValue) {
        throw new Error('Property "config" not allow to be modified');
    }

    get config() {
        return this.__config();
    }
}

module.exports = Conf;
