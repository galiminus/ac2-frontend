import React, { PropTypes } from 'react';
import { indigo600 } from 'material-ui/styles/colors';

import { Link } from 'react-router';

const PageLink = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    render() {
        return (
            <Link
                to={`/messages/${this.props.page.slug}`}
                style={{
                    textDecoration: 'none',
                    color: indigo600,
                    padding: 0,
                    marginBottom: 2
                }}
            >
                {this.props.page.title}
            </Link>
        );
    }
});

export default PageLink;
