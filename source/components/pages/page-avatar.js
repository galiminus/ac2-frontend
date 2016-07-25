import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import randomColor from 'utils/random-color';

import Avatar from 'material-ui/Avatar';

function getStyles() {
    const styles = {
        root: {
            marginRight: 8,
            fontFamily: 'Roboto, sans-serif',
            textTransform: 'uppercase',
            cursor: 'pointer'
        }
    };
    return (styles);
}

const UserAvatar = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        const styles = getStyles();

        return (
            <Avatar
                backgroundColor={randomColor(this.props.page.title)}
                style={Object.assign(styles.root, this.props.style)}
            >
                {this.props.page.title[0]}
            </Avatar>
        );
    }
});

export default UserAvatar;
