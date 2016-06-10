import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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

    getDefaultProps() {
        return ({
            page: {
                id: null,
                type: ''
            }
        });
    },

    render() {
        const styles = getStyles();

        let name;
        if (this.props.page.type.match(/^pages.profiles/)) {
            name = this.props.page.data.personal_informations.full_name;
        } else {
            name = '';
        }

        return (
            <Avatar
                backgroundColor={randomColor(name)}
                style={Object.assign(styles.root, this.props.style)}
            >
                {name[0]}
            </Avatar>
        );
    }
});

export default UserAvatar;
