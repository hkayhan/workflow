import React, { useContext } from 'react';
import FeatherIcon from "feather-icons-react";

function setSideBar() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function logOut() {
    window.location.hash = '/login';

}







function Navbar() {




    return (

        <nav className="navbar">

            <form className="d-flex w-100">
                <button className="btn toggle" onClick={() => setSideBar()} type="button">
                    <FeatherIcon icon={"menu"} />
                </button>


                <button className="btn log-out ms-auto" onClick={() => logOut()}>
                    <FeatherIcon icon={"log-out"} />

                    <span>Çıkış yap</span>
                </button>
            </form>
        </nav>


    );
}

export default Navbar;