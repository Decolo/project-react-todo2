import AV from 'leancloud-storage';

const APP_ID = 'a9LoGqiGaA46Gt1fXMitwYHT-gzGzoHsz';
const APP_KEY = 'W0JvqFX9sOXQovUeO59Vc3SS';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;


/*---------------------------------用户相关---------------------------------*/
/*---------------------------------注册---------------------------------*/
export function signUpRemote(username, password, email, successFn, errorFn) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)
    user.signUp().then(function(loginedUser) {
        //获取该user的实例
        let query = new AV.Query('_User')
        query.get(loginedUser.id).then(function(_user){
            //_user就是id为currentUser.id的实例对象
            _user.set('todoList',[])
            //为新的用户设置todolist为空数组
            _user.save().then(function(_user){
                //得到有用的user内容
                // console.log(_user)
                let currentUser = getUserFromAVUser(_user)
                // console.log(currentUser)
                successFn.call(null, currentUser)
            },function(error){
                console.error(error)
            })
        },function(error){
            console.error(error)
        })
    }, function(error) {
        errorFn.call(null, error)
    })
}
/*---------------------------------登入---------------------------------*/
export function signInRemote(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function(loginedUser) {
        //获取该user的实例
        let query = new AV.Query('_User')
        query.get(loginedUser.id).then(function(_user){
            //_user就是id为loginedUser.id的实例对象
            // console.log(_user)
            let currentUser = getUserFromAVUser(_user)
            // console.log(currentUser)
            successFn.call(null,currentUser)
        },function(error){
            console.error(error)
        })
    }, function(error) {
        errorFn.call(null, error)
    })
}
/*---------------------------------当前用户---------------------------------*/
export function getCurrentUser() {
    let user = AV.User.current()
    return user ? getUserFromAVUser(user) : null //getUserFromAVUser(user) => {id:xx,attr:xx}
}
/*---------------------------------登出---------------------------------*/
export function signOutRemote() {
    AV.User.logOut()
}
/*---------------------------------当前密码---------------------------------*/
export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function(success) {
        successFn.call()
    }, function(error) {
        errorFn.call()
    });
}
/*------------------------------获取有用的用户数据----------------------------*/
function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

/*---------------------------------用户相关---------------------------------*/



export function updataData(data) {
    if (getCurrentUser()) {
        //获取当前的user
        let cachingUser = getCurrentUser();
        //查询user实例
        let query = new AV.Query('_User');
        query.get(cachingUser.id).then(function(_user){
            //_user就是id为cachingUser.id下的实例对象
            _user.set('todoList',data)
            _user.save().then(function(_user){
                // console.log(_user)
                let currentUser = getUserFromAVUser(_user)
                console.log(currentUser)
            },function(error){
                console.error(error)
            })
        }, function(error){
            console.error(error);
        })
    }
}
export function getDataForMount(successFn) {
    if (getCurrentUser()) {
        let cachingUser = getCurrentUser()
        let query = new AV.Query('_User');
        query.get(cachingUser.id).then(function(_user){
            //_user就是id为cachingUser.id的实例对象
            // console.log(_user)
            let currentUser = getUserFromAVUser(_user)
            // console.log(currentUser)
            successFn.call(null,currentUser)
        }, function(error){
            console.log(error)
        })
    }
}