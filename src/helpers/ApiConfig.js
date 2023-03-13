let backend2Host;
let sso;

const hostname = window && window.location && window.location.hostname;

if( hostname === 'localhost' )
{
    backend2Host = 'http://localhost:9095';
    // backend2Host = 'https://otagws2.anadolu.edu.tr';
    sso=backend2Host+"/sso/anadolu";
    // sso=backend2Host+"/sso/sinav";
}
else if( hostname === '127.0.0.1' )
{
    backend2Host = 'https://otagws2.anadolu.edu.tr';
    // backend2Host = '10.10.60.78:9095';
    sso=backend2Host+"/sso/anadolu";

}
else
{
    backend2Host = 'https://otagws2.anadolu.edu.tr';
    sso=backend2Host+"/sso/anadolu";

}

export const OTAGWS2_URL = `${backend2Host}`;
export const SSO_URL = `${sso}`;
