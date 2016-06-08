import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import List from 'material-ui/List';
import { red500, yellow500, green500 } from 'material-ui/styles/colors';

import StatusIndicator from 'material-ui/svg-icons/image/brightness-1';

import RosterItem from 'components/roster-item';

function mapStateToProps(state) {
    return {
        pages: state.pages
    };
}

const Roster = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            currentUserPage: {}
        });
    },

    pagesByPresence(presence) {
        return (
            this.props.pages.filter((page) => {
                return (
                    page.type === 'profile_pages' &&
                    page.presence === presence &&
                    page.id !== this.props.currentUserPage.id
                );
            })
        );
    },

    render() {
        return (
            <List>
                {
                    this.pagesByPresence('available').valueSeq().map((page) => {
                        return (
                            <RosterItem
                                key={page.id}
                                recipient={page}
                                rightIcon={
                                    <StatusIndicator style={{ fill: green500, width: 8, height: 8, top: 12 }} />
                                }
                            />
                        );
                    })
                }
            </List>
        );
    }
});

export default connect(mapStateToProps)(Roster);
