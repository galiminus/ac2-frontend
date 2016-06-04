import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

import PageAvatar from 'components/page-avatar';
import PageLink from 'components/page-link';

const RosterItem = React.createClass({
    propTypes: {
        recipient: PropTypes.object
    },

    render() {
        return (
            <ListItem
                primaryText={<PageLink page={this.props.recipient} />}
                leftAvatar={
                    <PageAvatar page={this.props.recipient} />
                }
                {...this.props}
            />
        );
    }
});

export default RosterItem;
