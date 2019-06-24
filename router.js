/* 
 * router.js 路由模块
 * 职责：
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强代码的可维护性
 */

var fs = require('fs');
var Students = require('./students');


// 以下方法可行，但也不方便

// module.exports = function (app) {
//     app.get('/students', function (req, res) {
//         // readFile第二个参数为可选，传入utf-8将读入的文件转为我们能认识的字符
//         fs.readFile('./views/db.json', 'utf-8', function (err, data) {
//             if (err) {
//                 return res.status(500).send('Sever error');
//             }

//             // 从文件中读取到的data一定是字符串
//             // 所以一定要转成对象
//             var students = JSON.parse(data).students;
//             res.render('index.html', {
//                 names: [
//                     'kaisei',
//                     'vortesnail',
//                     'namelessAssassin',
//                 ],
//                 students: students,
//             });
//         });
//     })

//     app.get('/students/new' ,function (req, res) {

//     })    
    
//     app.get('/students/new' ,function (req, res) {

//     })

//     app.get('/students/new' ,function (req, res) {

//     })
// }

// express提供了更好的方式
// 专门用来包装路由
var express = require('express');

// 1.创建一个路由容器
var router = express.Router();

// 2.把路由都挂载到路由容器中
router.get('/students', function (req, res) {
    // readFile第二个参数为可选，传入utf-8将读入的文件转为我们能认识的字符
    // fs.readFile('./views/db.json', 'utf-8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('Sever error');
    //     }

    //     // 从文件中读取到的data一定是字符串
    //     // 所以一定要转成对象
    //     var students = JSON.parse(data).students;
    //     res.render('index.html', {
    //         names: [
    //             'kaisei',
    //             'vortesnail',
    //             'namelessAssassin',
    //         ],
    //         students: students,
    //     });
    // });

    Students.find(function (err, students) {
        if (err) {
            return res.status(500).send('Sever error');
        }
        res.render('index.html', {
            names: [
                'kaisei',
                'vortesnail',
                'namelessAssassin',
            ],
            students: students,
        });
    })
})

router.get('/students/new' ,function (req, res) {
    res.render('new.html');
})    

router.post('/students/new' ,function (req, res) {
    // 1.获取表单数据
    // 2.处理
    //      将数据保存到 db.json 文件中用以持久化
    // 3.发送响应

    // 读取出来，再转成对象
    // 然后往对象中 push 数据
    // 然后把对象转为字符串
    // 把字符串再次写入文件
    Students.save(req.body, function (err) {
        if (err) {   
             return res.status(500).send('Sever error');
        }    
        res.redirect('/students');
    })

})

router.get('/students/edit' ,function (req, res) {
    // 1.在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2.获取要编辑的学生 id
    // 3.渲染编辑页面
    //      根据 id 把学生信息查出来
    //      模板引擎渲染页面
    Students.findById(req.query.id, function (err, student) {
        if (err) {
            return res.status(500).send('Sever error');
        }
        res.render('edit.html', {
            student: student,
        });
    })
    
})

router.post('/students/edit' ,function (req, res) {
    // 1.获取表单数据
    //      req.body
    // 2.更新
    //      student.updateByid
    // 3.发送响应
    Students.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Sever error');
        }
        res.redirect('/students');
    })
})

router.get('/students/delete' ,function (req, res) {
    // 1.获取要删除的 id
    // 2.根据 id 执行删除操作
    // 3.根据操作结果发送响应数据
    Students.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Sever error');
        }
        res.redirect('/students');
    })
})

// 3.把router导出
module.exports = router;