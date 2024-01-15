import React from "react";
import Button from "react-bootstrap/esm/Button";


class loginNav extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            props: props
        }
    }

    render(){
        return (
            <>
                <div className="pageSwitcher">
                <Button
                    to="/login/sign-in"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                    onClick={this.state.props.onAutentificare}
                >
                    Autentificare
                </Button>
                <Button
                    exact
                    to="/login"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                    onClick={this.state.props.onInregistrare}
                >
                    Inregistrare
                </Button>
                </div>

            
                
            </>
        )
    }
}

export default loginNav;