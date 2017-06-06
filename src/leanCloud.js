import AV from 'leancloud-storage';

const APP_ID = 'a9LoGqiGaA46Gt1fXMitwYHT-gzGzoHsz';
const APP_KEY = 'W0JvqFX9sOXQovUeO59Vc3SS';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;
console.log(AV.User.current())
export function signUpRemote(username, password, email, successFn, errorFn) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)
    user.signUp().then(function(loginedUser) {
        console.log(loginedUser)
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
        successFn.call(null, user) // user => {id:xx,attr:xx}
    }, function(error) {
        errorFn.call(null, error)
    })
}
export function getCurrentUser() {
    let user = AV.User.current()
    return user ? getUserFromAVUser(user) : null //getUserFromAVUser(user) => {id:xx,attr:xx}
}
export function signOutRemote() {
    AV.User.logOut()
}
export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function(success) {
        successFn.call()
    }, function(error) {
        errorFn.call()
    });
}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}