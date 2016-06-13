import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import Immutable from 'immutable';

import actionCreators from 'action-creators';

import api from 'api';

import Roster from "components/roster/roster";

function mapStateToProps(state) {
    return {
        recipients: state.pages
    };
}

const ChatContainer = React.createClass({
    propTypes: {
        currentUserPage: PropTypes.object.isRequired,
        recipients: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return {
            currentUserPage: {
                id: null,
                type: ''
            }
        };
    },

    getInitialState() {
        return { currentRecipient: undefined };
    },

    componentDidMount() {
        api.pages.find({ presence: "available" }).then((response) => {
            this.props.addResource(response);
        });
    },

    handleSetCurrentRecipient(recipient) {
        this.setState({ currentRecipient: recipient })
    },

    renderRosterFull() {
        return (
            <Roster
                currentUserPage={this.props.currentUserPage}
                recipients={this.props.recipients}
                onSetCurrentRecipient={this.handleSetCurrentRecipient}
                compact={false}
            />
        );
    },

    renderConversation() {
        return (
            <div style={{ display: "flex" }}>
                <Roster
                    currentUserPage={this.props.currentUserPage}
                    recipients={this.props.recipients}
                    onSetCurrentRecipient={this.handleSetCurrentRecipient}
                    compact={true}
                />
                <div style={{ flex: 1 }}>
                    LOL
                </div>
            </div>
        );
    },

    render() {
        return (!!this.state.currentRecipient ? this.renderConversation() : this.renderRosterFull());
    }
});

export default connect(mapStateToProps, actionCreators)(ChatContainer);
