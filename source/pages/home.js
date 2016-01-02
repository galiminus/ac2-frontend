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
    AcToolbar
} from "components";

import { leftNav, currentUser } from "action-creators";

import { users, pageTypes } from "api";


function mapStateToProps(state) {
    return {
        currentUser: state.users.get(state.currentUser),
        currentToken: state.tokens.get(state.currentToken),
        leftNav: state.leftNav
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleLeftNav: () => dispatch(leftNav.toggle()),
        setCurrentUser: (id) => dispatch(currentUser.set(id))
    };
}

const Home = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired,
        currentUser: PropTypes.object.isRequired,
        currentToken: PropTypes.object.isRequired,
        leftNav: PropTypes.bool.isRequired,
        children: PropTypes.object
    },

    getDefaultProps() {
        return {
            currentUser: {}
        };
    },

    componentDidMount() {
        users.me({ include: "page" }).then((response) => {
            this.props.setCurrentUser(response.data.id);
        });
        pageTypes.find("user");
    },

    componentWillReceiveProps(props) {
        if (this.props.leftNav !== props.leftNav) {
            this.refs.leftNav.toggle();
        }
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
                        { this.props.currentUser ? <CurrentUserMenu user={this.props.currentUser} /> : ""}
                    </ToolbarGroup>
                    {/* <ToolbarGroup key={1} float="right">
                        <AutoComplete hintText="search" className="hide-sm hide-xs" />
                    </ToolbarGroup> */}
                </AcToolbar>
                <LeftNav docked={false} ref="leftNav" onChante={this.lol}>
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
                <DisconnectedModal isDisconnected={!this.props.currentToken} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
