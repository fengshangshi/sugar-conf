/**
 * @file sugar2.0-配置文件管理组件
 * @author ss.feng
 */
'use strict'

const path = require('path');
const toml = require('sugar-toml');

const Scan = require('./libs/Scan');


class Conf {
    constructor(path, ignore) {
        const scan = new Scan({
            ext: '.toml',
            path: path,
        });

        this.files = scan.files;
        this.ignore = ignore || 'config';
    }

    __invertFiles() {
        let map = new Map;
        let files = this.files;

        files.forEach((value, key) => {
            let name = path.parse(key).name;

            // 对同一个目录下的文件进行排序
            if (map.has(value)) {
                if (name === this.ignore) {
                    // 如果是特殊文件，放在数组头部
                    map.get(value).unshift(key);
                } else {
                    // 其他非特殊文件
                    map.get(value).push(key);
                }
            } else {
                map.set(value, [key]);
            }
        });

        return map;
    }

    __sortWithPathDepth(files) {
        let filesSorted = [];
        let flag = 0;

        files.forEach((value, key) => {
            // 计算路径深度
            let count = key.split(/\//).filter((k) => {
                return k.length > 0;
            });

            // 数组合并前后的关系问题，通过flag对比
            filesSorted = count > flag ?
                filesSorted.concat(value) : value.concat(filesSorted);

            // 记录最新的路径深度
            flag = count;
        });

        return filesSorted;
    }


    __fetchConfigure() {
        let config = {};
        let files = this.__sortWithPathDepth(this.__invertFiles());

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
        return this.__fetchConfigure();
    }
}

module.exports = Conf;
