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

import actions from "action-creators";

import { users, pageTypes } from "api";

function mapStateToProps(state) {
    const currentUserProp = state.users.get(state.currentUser);

    let currentUserPageProp;
    if (currentUserProp) {
        currentUserPageProp = state.pages.get(currentUserProp.page_id);
    }

    return {
        currentUserPage: currentUserPageProp,
        currentToken: state.tokens.get(state.currentToken),
        translations: state.translations.get("fr-FR"),
        leftNav: state.leftNav
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleLeftNav: () => dispatch(actions.leftNav.toggle()),
        setCurrentUser: (id) => dispatch(actions.currentUser.set(id))
    };
}

const Home = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        currentToken: PropTypes.object.isRequired,
        leftNav: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired,
        translations: PropTypes.object.isRequired
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

    componentDidMount() {
        users.me({ include: "page" }).then((response) => {
            this.props.setCurrentUser(response.data.id);
        });
        pageTypes.find("user");
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
                        <CurrentUserMenu currentUserPage={this.props.currentUserPage} translations={this.props.translations} />
                    </ToolbarGroup>
                    {/* <ToolbarGroup key={1} float="right">
                        <AutoComplete hintText="search" className="hide-sm hide-xs" />
                    </ToolbarGroup> */}
                </AcToolbar>
                <LeftNav docked={false} open={this.props.leftNav} onRequestChange={this.props.toggleLeftNav}>
                    <Navigation translations={this.props.translations} />
                </LeftNav>
                <div className="row" style={{ minHeight: "100%" }}>
                    <Paper className="hide-sm hide-xs" style={{ paddingRight: 0, marginTop: 56, width: 220, zIndex: 1 }}>
                        <Navigation style={{ width: 220, position: "fixed" }} translations={this.props.translations} />
                    </Paper>
                    <section className="col-md col-xs-12" style={{ paddingLeft: 0, paddingRight: 0, marginTop: 56 }}>
                        {React.cloneElement(this.props.children, {
                            currentUserPage: this.props.currentUserPage,
                            translations: this.props.translations
                        })}
                    </section>
                </div>
                <Notifier translations={this.props.translations} />
                <DisconnectedModal isDisconnected={!this.props.currentToken} translations={this.props.translations} />
            </div>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
