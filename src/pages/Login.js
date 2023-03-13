import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import Cookies from "universal-cookie";
import "./Login.css";
import {clearCookie} from '../helpers/Helpers';
import aulogo from '../assets/images/au_logo.png'
import {SSO_URL} from "../helpers/ApiConfig";

function getParameterByName(name, url) {
    if (!url) url=window.location.href;

//eslint-disable-next-line
    name=name.replace(/[\[\]]/g, "\\$&");
    let regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),
        results=regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class Login extends Component {

    constructor(props) {

        super(props);
        console.log("11.03.2023 19:22")

        const cookies=new Cookies();
        if (cookies.get('nvitoken')) {
            cookies.remove('nvitoken');
            cookies.remove('nvitoken');
        }

        clearCookie();
    }


    render() {

        // eslint-disable-next-line no-unused-vars
        let err=getParameterByName('message');

        return (

            <div className=" flex-row align-items-center landing-page">

                <div className="h-100 login-enter-body">

                    <div className="d-flex justify-content-evenly flex-column bd-highlight mb-3 h-100" style={{height:200}}>
                        <div className="p-2 bd-highlight login-corporate">
                            <img src={aulogo} alt=""/>
                        </div>
                        <div className="p-2 bd-highlight">
                            <h1 className={"text-center"}>Akış Kontrol Otomasyonu</h1>
                        </div>

                        <div className="p-2 bd-highlight">
                            <a href={"http://localhost:3000/"} className="text-white">
                            <button color="" className="px-auto py-2 text-justify-center mt-4 mx-auto login-button">
                                Anadolu Üniversitesi Kimliği İle Giriş
                            </button>
                        </a></div>
                    </div>


                </div>

            </div>
        );
    }
}

export default Login;

