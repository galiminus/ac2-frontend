import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import RouterLink from 'react-router/lib/Link';

const defaultProps = {
    style: {},
    onBlack: false
};

const Link = React.createClass({
    propTypes: {
        onBlack: PropTypes.bool.isRequired,
        style: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        const { onBlack, style, ...otherProps } = this.props;

        return (
            <RouterLink
                style={{
                    textDecoration: 'none',
                    color: (onBlack ? '#fff' : '#000'),
                    ...style
                }}
                {...otherProps}
            />
        );
    }
});

export default Link;
