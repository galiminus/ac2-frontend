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

        return (
            <Link to={`/${this.props.page.slug}`} style={Object.assign(styles.root, this.props.style)}>
                {this.props.page.title}
            </Link>
        );
    }
});

export default PageLink;
