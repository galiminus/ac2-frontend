import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    ToolbarGroup,
    LeftNav,
    Paper,
    FontIcon
} from "material-ui";

import {
    DisconnectedModal,
    Navigation,
    ToolbarLogo,
    CurrentUserMenu,
    AcToolbar,
    Notifier
} from "components";

import actionCreators from "action-creators";

import api from "api";

function mapStateToProps(state) {
    const currentUserProp = state.users.get(state.currentUser);

    let currentUserPageProp;
    if (currentUserProp) {
        currentUserPageProp = state.pages.get(currentUserProp.page_id);
    }

    return {
        currentUserPage: currentUserPageProp,
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

    render() {
        return (
            <div style={{ height: "100%" }}>
                <AcToolbar>
                    <ToolbarGroup key={0} float="left">
                        <FontIcon className="material-icons hide-md hide-lg" style={{ paddingLeft: 0, paddingRight: 24 }} onClick={this.props.toggleLeftNav}>menu</FontIcon>
                        <ToolbarLogo />
                    </ToolbarGroup>
                    <ToolbarGroup key={2} float="right">
                        <CurrentUserMenu />
                    </ToolbarGroup>
                </AcToolbar>
                <LeftNav docked={false} open={this.props.leftNav} onRequestChange={this.props.toggleLeftNav}>
                    <Navigation />
                </LeftNav>
                <div className="row" style={{ minHeight: "100%" }}>
                    <Paper className="hide-sm hide-xs" style={{ paddingRight: 0, marginTop: 56, width: 220, zIndex: 1 }}>
                        <Navigation style={{ width: 220, position: "fixed" }} />
                    </Paper>
                    <section className="col-md col-xs-12" style={{ paddingLeft: 0, paddingRight: 0, marginTop: 56 }}>
                        {this.props.children}
                    </section>
                </div>
                <Notifier />
                <DisconnectedModal isDisconnected={!this.props.currentToken} />
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Home);
