import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { ListItem } from 'material-ui/List';

import PageAvatar from 'components/page-avatar';

const RosterItem = React.createClass({
    propTypes: {
        recipient: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ListItem
                leftAvatar={
                    <PageAvatar page={this.props.recipient} />
                }
                {...this.props}
            />
        );
    }
});

export default RosterItem;
