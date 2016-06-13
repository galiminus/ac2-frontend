import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import List from 'material-ui/List';
import { red500, yellow500, green500 } from 'material-ui/styles/colors';

import StatusIndicator from 'material-ui/svg-icons/image/brightness-1';

import RosterItem from './roster-item';
import CompactRosterItem from './compact-roster-item';

const Roster = React.createClass({
    propTypes: {
        recipients: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        onSetCurrentRecipient: PropTypes.func.isRequired,
        compact: PropTypes.bool
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            currentUserPage: {
                id: null,
                type: ''
            }
        });
    },

    recipientsByPresence(presence) {
        return (
            this.props.recipients.filter((recipient) => {
                return (
                    recipient.type.match(/Page::Profile$/) &&
                    recipient.presence === presence &&
                    recipient.id !== this.props.currentUserPage.id
                );
            })
        );
    },

    renderCompact() {
        return (
            <List>
                {
                    this.recipientsByPresence('available').valueSeq().map((recipient) => {
                        return (
                            <CompactRosterItem
                                key={recipient.id}
                                recipient={recipient}
                                onClick={() => this.props.onSetCurrentRecipient(recipient) }
                            />
                        );
                    })
                }
            </List>
        );
    },

    renderWide() {
        return (
            <List>
                {
                    this.recipientsByPresence('available').valueSeq().map((recipient) => {
                        return (
                            <RosterItem
                                key={recipient.id}
                                recipient={recipient}
                                onClick={() => this.props.onSetCurrentRecipient(recipient) }
                                rightIcon={
                                    <StatusIndicator style={{ fill: green500, width: 8, height: 8, top: 12 }} />
                                }
                            />
                        );
                    })
                }
            </List>
        );
    },

    render() {
        return (this.props.compact ? this.renderCompact() : this.renderWide());
    }
});

export default Roster;
