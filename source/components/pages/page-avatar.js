import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import randomColor from 'utils/random-color';

import Avatar from 'material-ui/Avatar';

const UserAvatar = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        const style = {
            marginRight: 8,
            fontFamily: this.context.muiTheme.fontFamily,
            textTransform: 'uppercase',
            cursor: 'pointer'
        };
        
        return (
            <Avatar
                backgroundColor={randomColor(this.props.page.title)}
                style={{ ...style, ...this.props.style }}
            >
                {this.props.page.title[0]}
            </Avatar>
        );
    }
});

export default UserAvatar;
