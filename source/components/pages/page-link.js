import React, { PropTypes } from 'react';

import { Link } from 'react-router';

const PageLink = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    render() {
        return (
            <Link
                to={`/messages/${this.props.page.slug}`}
                style={{
                    textDecoration: 'none',
                    color: this.context.muiTheme.palette.primary1Color,
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
