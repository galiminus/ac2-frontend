import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    Drawer,
    Paper,
} from "material-ui";

import {
    DisconnectedModal,
    Navigation,
    AcToolbar,
    Notifier,
    Roster,
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
        console.log(this.props.leftNav);
        return (
            <div style={{ height: "100%" }}>
                <ActionCable channel="PagesChannel" onMessage={this.handleMessage} />
                <AcToolbar />

                <Drawer docked={false} open={this.props.leftNav} onRequestChange={this.props.toggleLeftNav}>
                    <Navigation />
                </Drawer>

                <div className="row" style={{ minHeight: "100%" }}>
                    <div className="hide-sm hide-xs" style={{ paddingRight: 0, marginTop: 56, width: 220, zIndex: 1 }}>
                        <Navigation style={{ width: 220, position: "fixed" }} />
                    </div>
                    <section className="col-md col-xs-12" style={{ paddingLeft: 0, paddingRight: 0, marginTop: 56, minHeight: "100%" }}>
                        {this.props.children}
                    </section>
                    <Paper className="hide-sm hide-xs" style={{ paddingRight: 0, marginTop: 56, width: 220, zIndex: 2 }}>
                        <Roster style={{ width: 220, position: "fixed" }} />
                    </Paper>
                </div>

                <Notifier />

            <DisconnectedModal isDisconnected={!this.props.currentToken} />
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Home);
