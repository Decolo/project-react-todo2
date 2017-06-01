import AV from 'leancloud-storage'

const APP_ID = 'a9LoGqiGaA46Gt1fXMitwYHT-gzGzoHsz';
const APP_KEY = 'W0JvqFX9sOXQovUeO59Vc3SS';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;

export function signUpRemote(username, password, successFn, errorFn) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.signUp().then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        console.log(user)
        successFn.call(null, user) // user => {id:xx,attr:xx}
    }, function(error) {
        errorFn.call(null, error)
    });
}
export function signInRemote(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        console.log(user)
        successFn.call(null, user) // user => {id:xx,attr:xx}
    }, function(error) {
        errorFn.call(null, error)
    })
}
export function getCurrentUser() {
    let user = AV.User.current() //user => {id:xx,attr:xx}
    return user ? getUserFromAVUser(user) : null
}
export function signOutRemote() {
    AV.User.logOut()
}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}