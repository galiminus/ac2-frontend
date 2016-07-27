import { typeToShortPluralType } from 'utils/types';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Link from 'components/link';

const PageLink = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Link
                to={`/${typeToShortPluralType(this.props.page.type)}/${this.props.page.slug}`}
                style={{
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
