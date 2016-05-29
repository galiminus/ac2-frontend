import React, { PropTypes } from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import styles from "./home.css";

import {
    Drawer,
    Paper
} from "material-ui";

import {
    DisconnectedModal,
    Navigation,
    HeaderBar,
    Notifier,
    Roster,
    AdditionalLinks,
    ActionCable
} from "components";

import actionCreators from "action-creators";

import api from "api";

function mapStateToProps(state) {
    const currentUser = state.users.get(state.currentUser);

    let currentUserPage;
    if (currentUser) {
        currentUserPage = state.pages.get(currentUser.page_id);
    }

    return {
        currentUser,
        currentUserPage,
        currentToken: state.tokens.get(state.currentToken),
        leftNav: state.leftNav
    };
}

const Home = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        currentToken: PropTypes.object.isRequired,
        leftNav: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired
    },

    childContextTypes: {
        currentUserPage: PropTypes.object
    },

    getDefaultProps() {
        return {
            currentUserPage: {
                presence: "connected",
                data: {
                    personal_informations: {
                        full_name: ""
                    }
                }
            }
        };
    },

    getChildContext() {
        return ({
            currentUserPage: this.props.currentUserPage
        });
    },

    componentDidMount() {
        api.users.me({ include: "page" }).then((response) => {
            this.props.setCurrentUser(response.data.id);
            this.props.addResource(response);
        });
        api.pageTypes.find("user").then(this.props.addResource);
    },

    componentWillReceiveProps(props) {
        if (props.currentUser) {
            api.pages.update(props.currentUser.page_id, { presence: "available" });
        }
    },

    handleMessage(message) {
        console.log(message);
    },

    render() {
        return (
            <div styleName="home">
                <HeaderBar />

                <Drawer docked={false} open={this.props.leftNav} onRequestChange={this.props.toggleLeftNav}>
                    <Navigation />
                </Drawer>

                <div styleName="flexLayout">
                    <div styleName="leftNav">
                        <Navigation />
                        <AdditionalLinks />
                    </div>
                    <main styleName="mainContent">
                        {this.props.children}
                    </main>
                <Paper styleName="messagePanel">
                    <Roster />
                </Paper>
                </div>

                <Notifier />

                <DisconnectedModal isDisconnected={!this.props.currentToken} />
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(CSSModules(Home, styles));
