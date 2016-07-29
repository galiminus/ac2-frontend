import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import IconButton from 'material-ui/IconButton';

const LoaderIcon = React.createClass({
    propTypes: {
        size: PropTypes.number,
        border: PropTypes.number,
        comment: PropTypes.string,
        onTouchTap: PropTypes.func,
        icon: PropTypes.node.isRequired,
        buttonStyle: PropTypes.object,
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            size: 40,
            border: 60,
            buttonStyle: {}
        });
    },

    render() {
        const { border, size, comment, onTouchTap, icon } = this.props;

        const iconButtonStyle = {
            width: border + size,
            height: border + size,
            ...this.props.buttonStyle
        };

        const iconStyle = {
            width: size,
            height: size,
            background: '#fff',
            borderRadius: size / 2,
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
        };


        return (
            <div>
                <IconButton
                    onTouchTap={onTouchTap}
                    style={iconButtonStyle}
                    iconStyle={iconStyle}
                >
                    {React.cloneElement(icon, { color: this.context.muiTheme.palette.accent3Color })}
                </IconButton>
                {comment &&
                    <p
                        style={{
                            color: this.context.muiTheme.palette.accent3Color,
                            fontFamily: this.context.muiTheme.fontFamily
                        }}
                    >
                        {comment}
                    </p>
                }
            </div>
        );
    }
});

export default LoaderIcon;
