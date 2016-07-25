import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { ListItem } from 'material-ui/List';

import PageAvatar from 'components/pages/page-avatar';
import PageLink from 'components/pages/page-link';

const RosterItem = React.createClass({
    propTypes: {
        recipient: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ListItem
                primaryText={<div>
                    <PageLink page={this.props.recipient} />
                </div>}
                leftAvatar={
                    <PageAvatar page={this.props.recipient} />
                }
                {...this.props}
            />
        );
    }
});

export default RosterItem;
