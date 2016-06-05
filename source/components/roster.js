import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/List';
import StatusIndicator from 'material-ui/svg-icons/image/brightness-1';

import RosterItem from 'components/roster-item';

function mapStateToProps(state) {
    return {
        pages: state.pages
    };
}

const Roster = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    pagesByPresence(presence) {
        return (
            this.props.pages.filter((page) => {
                return (page.type === 'profile_pages' && page.presence === presence);
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
                                rightIcon={<StatusIndicator color="#33ff33" style={{ width: 8, height: 8, top: 12 }} />}
                            />
                        );
                    })
                }
            </List>
        );
    }
});

export default connect(mapStateToProps)(Roster);
