import React, { PropTypes } from 'react';
import { indigo600 } from 'material-ui/styles/colors';

import { Link } from 'react-router';

function getStyles() {
    const styles = {
        root: {
            textDecoration: 'none',
            color: indigo600,
            padding: 0,
            marginBottom: 2
        }
    };
    return (styles);
}

const PageLink = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        style: PropTypes.object
    },

    getDefaultProps() {
        return ({
            page: { type: null }
        })
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
            <Link to={`/${this.props.page.id}`} style={Object.assign(styles.root, this.props.style)}>
                {name}
            </Link>
        );
    }
});

export default PageLink;
