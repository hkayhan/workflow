import React from 'react';
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";
import {Route, Routes, Link, NavLink, Outlet} from "react-router-dom";
import Home from "../views/Home";
import AssignStuff from "../views/Assign/AssignStuff";
import SpecialAppend from "../views/Assign/SpecialAppend";

function Content(props) {
    return (
        <div className={"wrapper d-flex"}>
            <Sidebar/>
            <div className="content">
                <div className="container-fluid">
                    <NavBar/>
                    <Outlet/>

                </div>
            </div>
        </div>
    );
}

export default Content;