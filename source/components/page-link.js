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

    render() {
        const styles = getStyles();

        let name;
        switch (this.props.page.type) {
        case 'user-pages':
            name = this.props.page.data['personal-informations']['full-name'];
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
