/**
 * @file 文件扫描器类
 * @author ss.feng
 */
'use strict'

const fs = require('fs');
const path = require('path');
const type = require('sugar-type');

class Scan {
    constructor(options) {
        options = options || {};

        let path = options.path;
        if (!fs.existsSync(path)) {
            throw new Error('Scan path "' + path + '" is illegal');
        }

        this.path = path;

        this.__files = new Map;
        this.__ext = options.ext || '*';
    }

    __readFile(dir, root) {
        root = root || '/';
        dir = dir || this.path;

        let stat = this.__getStat(dir);
        if (stat && stat.isDirectory()) {

            let dirs = fs.readdirSync(dir);
            dirs.forEach((d) => {
                let file = path.join(dir, d);
                let fileStat = this.__getStat(file);

                // 当文件类型为文件时
                if (fileStat.isFile()) {
                    let ext = path.parse(file).ext;

                    if (this.__ext === '*' || this.__extIncludes(ext)) {
                        this.__files.set(file, root);
                    }
                }

                // 当文件类型为目录时
                if (fileStat.isDirectory()) {
                    this.__readFile(file, path.join(root, d));
                }

            });
        }

        return this.__files;
    }

    __extIncludes(ext) {
        let extArray = type.isArray(this.__ext) ? this.__ext : Array(this.__ext);

        return extArray.includes(ext);
    }

    __getStat(path) {
        try {
            return fs.statSync(path);
        } catch (e) {
            return false;
        }
    }

    set files(newValue) {
        throw new Error('Property "files" not allow to be modified');
    }

    get files() {
        return this.__readFile();
    }
}

module.exports = Scan;
