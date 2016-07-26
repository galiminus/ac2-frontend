import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import randomColor from 'utils/random-color';

import Avatar from 'material-ui/Avatar';

const style = {
    root: {
        marginRight: 8,
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        cursor: 'pointer'
    }
};

const UserAvatar = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Avatar
                backgroundColor={randomColor(this.props.page.title)}
                style={{ ...style.root, ...this.props.style }}
            >
                {this.props.page.title[0]}
            </Avatar>
        );
    }
});

export default UserAvatar;
