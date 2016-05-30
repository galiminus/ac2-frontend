import React, { PropTypes } from "react";
import { connect } from "react-redux";
import actionCreators from "action-creators";
import api from "api";

import Home from "./home";

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

const HomeContainer = React.createClass({
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
        api.users.me({ include: "page,page.page_type" }).then((response) => {
            this.props.setCurrentUser(response.data.id);
            this.props.addResource(response);
        });
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
            <Home
                toggleLeftNav={this.props.toggleLeftNav}
                children={this.props.children}
                leftNav={this.props.leftNav}
                isDisconnected={!this.props.currentToken}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(HomeContainer);
