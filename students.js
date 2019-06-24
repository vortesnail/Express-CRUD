/*
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 * 
 * 这里才是我们学习 Node 的奥义所在
 * 封装异步 API
 */
var fs = require('fs');

var dbPath = './views/db.json'

/*
 * 获取所有学生列表
 * callback 中的参数
 *      第一个参数是 err
 *          成功是 null
 *          失败是 错误对象
 *      第二个参数是 结果
 *          成功是 数组
 *          错误是 undefined
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        // JSON.parse(data).students;
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data).students);
    })
}

/*
 * 根据 id 获取学生对象
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        // JSON.parse(data).students;
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var ret = students.find(function (item) {
            return item.id === parseInt(id);
        })
        callback(null, ret);
    })
}

/*
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        // JSON.parse(data).students;
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;

        // 处理 id 不重复问题
        student.id = students[students.length - 1].id + 1;

        // 把用户传递的对象添加到数组中
        students.push(student);
        // 把对象数据转换为字符串，把字符串保存到文件中
        var fileData = JSON.stringify({
            students: students,
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            // 成功就是 null
            callback(null);
        });
    })
}

/*
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        // JSON.parse(data).students;
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        student.id = parseInt(student.id);

        // 你要修改谁，就把谁找出来
        // ES6中的一个数组方法：find
        // 需要接收一个函数作为参数
        // 当某个遍历项符合 item.id = student.id 这个条件的时候，find 会停止遍历，并返回该遍历项
        var stu = students.find(function (item) {
            return item.id === student.id;
        });

        for (var key in student) {
            stu[key] = student[key];
        }

        // 把对象数据转换为字符串，把字符串保存到文件中
        var fileData = JSON.stringify({
            students: students,
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            // 成功就是 null
            callback(null);
        });
    })
}

/*
 * 删除学生
 */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        // JSON.parse(data).students;
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;

        // findIndex 方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id);
        })

        // 根据下标删除对应的数组对象
        students.splice(deleteId, 1);

        // 把对象数据转换为字符串，把字符串保存到文件中
        var fileData = JSON.stringify({
            students: students,
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            // 成功就是 null
            callback(null);
        });
    })
}