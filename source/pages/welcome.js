import React, { PropTypes } from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import styles from "./welcome.css";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";

import ToolbarLogo from "components/toolbar-logo";
import { Notifier } from "components";

function mapStateToProps(state) {
    return {
        isLoggedIn: state.currentUser !== null,
        currentPath: state.routing.path
    };
}

const LoginPage = React.createClass({
    propTypes: {
        isLoggedIn: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,
        children: PropTypes.node
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getFormTitle() {
        return {
            "/welcome/login": "login",
            "/welcome/signup": "signup",
            "/welcome/recover": "recover"
        }[this.props.currentPath];
    },

    render() {
        return (
            <div styleName="root">
                <Toolbar styleName="headerBar">
                    <ToolbarGroup key={0} float="left">
                        <ToolbarLogo />
                    </ToolbarGroup>
                </Toolbar>
                <div styleName="illustration">

                </div>
                <div styleName="formContainer">
                    <div styleName="formPaper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});


// <div style={{ background: loginPageBackground, height: "100%", width: "100%", position: "fixed" }}>
//     <div className="row middle-xs center-xs" style={{ height: "100%" }}>
//         <Paper className="col-md-4 col-sm-8 col-xs-11" style={{ padding: "16px 32px 32px 32px" }}>
//             <h3 style={{ marginBottom: 32, fontWeight: 200, fontSize: 14, textTransform: "uppercase" }}>
//                 { this.context.translation.t(`forms.${this.getFormTitle()}`) }
//             </h3>
//             {this.props.children}
//         </Paper>
//     </div>
//     <Notifier />
// </div>
export default connect(mapStateToProps)(CSSModules(LoginPage, styles));
