import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import RouterLink from 'react-router/lib/Link';

const defaultProps = {
    style: {},
    onBlack: false,
    fullWidth: false
};

const Link = React.createClass({
    propTypes: {
        onBlack: PropTypes.bool.isRequired,
        style: PropTypes.object.isRequired,
        fullWidth: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    render() {
        const { onBlack, fullWidth, style, ...otherProps } = this.props;

        return (
            <RouterLink
                style={{
                    textDecoration: 'none',
                    fontFamily: this.context.muiTheme.fontFamily,
                    color: (onBlack ? '#fff' : '#000'),
                    display: 'inline-block',
                    width: (fullWidth ? '100%' : 'auto'),
                    ...style
                }}
                {...otherProps}
            />
        );
    }
});

export default Link;
