import Cookies from "universal-cookie";


export function clearCookie() {
    const cookies=new Cookies();
    cookies.remove('sinavtoken');


}
export function getTokenFromCookie() {
    const cookies=new Cookies();
    if (cookies.get('sinavtoken')) {
        return cookies.get('sinavtoken');
    }
    if (window.location.host==='https://acikogretim.anadolu.edu.tr'||
        window.location.host==='acikogretim.anadolu.edu.tr') // || window.location.host == 'localhost:8081')
        window.location.hash="/otherlogin";
    else
        window.location.hash="/login";
}

export function setCookieToToken(token) {
    const cookies=new Cookies();
    cookies.set('sinavtoken', token, {path: '/', maxAge: 10800});
    return false;
}
