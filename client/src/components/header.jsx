import React from 'react';
import { Link } from "react-router-dom";
function Header(props){
    return(
        <header className="App-header container">

            <div className="row">
                <div className="col-xs-2">
                <Link
                    to={"/"}>
                   <img src="./img/logo.svg" className="App-logo" alt="logo" />
                </Link>

                </div>
                <div className="col-xs-8">
                    <h1 className="app-title">Retainer</h1>
                </div>

                 <div className="col-xs-2">
             
                <Link
                    className="glyphicon glyphicon-question-sign app-about"
                    to={"/about"}>
                </Link>

                </div>
            </div>

        </header>
    )
}

export default Header;



