import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/List';

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
                            <RosterItem key={page.id} recipient={page} />
                        );
                    })
                }
            </List>
        );
    }
});

export default connect(mapStateToProps)(Roster);
