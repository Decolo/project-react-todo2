var AV = require('leancloud-storage')

var APP_ID = 'a9LoGqiGaA46Gt1fXMitwYHT-gzGzoHsz';
var APP_KEY = 'W0JvqFX9sOXQovUeO59Vc3SS';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


// var TodoFolder = AV.Object.extend('TodoFolder');
// // 新建对象
// var todoFolder = new TodoFolder();
// // 设置名称
// todoFolder.set('name', '工作');
// // 设置优先级
// todoFolder.set('priority', 1);
// todoFolder.save().then(function(todo) {
//     console.log('objectId is ' + todo.id);
// }, function(error) {
//     console.error(error);
// });



// var todoFolder = AV.Object.createWithoutData('TodoFolder', '5935834c0ce46300572e3eb6');
// todoFolder.fetch().then(function() {
//     var title = todoFolder.get('name'); // 读取 title
//     var content = todoFolder.get('priority'); // 读取 content
//     console.log(title)
//     console.log(content)
// }, function(error) {
//     // 异常处理
// });
// var todo = AV.Object.createWithoutData('Todo', '593571220ce46300572d5298');
// // 修改属性
// todo.set('content', '每周工程师会议，本周改为周三下午3点半。');
// // 保存到云端
// todo.save();

AV.User.logIn('Tom', 'cat!@#123').then(function(loginedUser) {
    console.log(loginedUser);
    var username = loginedUser.getUsername();
    var email = loginedUser.getEmail();
    console.log(username)
        // 请注意，密码不会明文存储在云端，因此密码只能重置，不能查看
}, function(error) {});