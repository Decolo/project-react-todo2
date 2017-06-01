import AV from 'leancloud-storage'

const APP_ID = 'a9LoGqiGaA46Gt1fXMitwYHT-gzGzoHsz';
const APP_KEY = 'W0JvqFX9sOXQovUeO59Vc3SS';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;

export function signUp(username, password, successFn, errorFn) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.signUp().then(function(loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn(user)
    }, function(error) {
        errorFn(error)
    });
}


function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        attr: AVUser.attributes
    }
}