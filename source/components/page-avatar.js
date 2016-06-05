import React, { PropTypes } from 'react';

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

    getDefaultProps() {
        return ({
            page: { type: null }
        });
    },

    render() {
        const styles = getStyles();

        let name;
        switch (this.props.page.type) {
        case 'profile_pages':
            name = this.props.page.data.personal_informations.full_name;
            break;
        default:
            name = '?';
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
