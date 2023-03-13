import React, { useEffect, useState} from 'react';
import '../assets/css/Main.css'
import FeatherIcon from 'feather-icons-react';
import {
    Link, useLocation
} from "react-router-dom";


function Sidebar() {

    const menu=[
        {
            menuCode: "home",
            menuName: "Ana Sayfa",
            iconName: "home",
            target: "/",
            relativePaths: ["home"]
        }, {
            menuCode: "workflows",
            menuName: "Akışlar Şablonları",
            iconName: "trello",
            target: "/workflows",
            relativePaths: ["/workflows"]

        }, {
            menuCode: "active-workflows",
            menuName: "Aktif Akışlar",
            iconName: "repeat",
            target: "/active-workflows",
            relativePaths: ["/active-workflows"],

        }]

    const location=useLocation();

    const activeMenu=menu=>{
        return location.pathname.indexOf(menu[0])> -1 ? "active" : "";
    }


    return (
        <div className="sidebar-wrap d-flex flex-column align-items-center" id="sidebar">
            <div className="brand-logo d-flex justify-content-between w-100">
                {/*<Link to={'home'}>*/}
                <Link to={'/assign'} className={"logo align-self-center"}/>
                {/*</Link>*/}
            </div>


            <div className="sidebar-menu-wrap mt-4">

                <ul>

                    {menu.map((m, index)=>
                        <Link key={index} to={m.target}>
                            {/*{activeMenu(m.target)}*/} {/*<li className={m.menuCode === selectedMenu ? "active" : ""}*/}
                            <li className={activeMenu(m.relativePaths)}// onClick={() => setSelectedMenu(m.menuCode)}

                            >

                                <div className={'sidebar-item'}>

                                    <FeatherIcon icon={m.iconName}/>

                                    <span>{m.menuName}</span>
                                </div>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
            <div className="info d-md-none  d-none d-lg-block text-center">
                <span>© Anadolu Üniversitesi 2023 Baum</span>
            </div>
        </div>

    );
}

export default Sidebar;