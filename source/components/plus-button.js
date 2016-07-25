import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import IconButton from 'material-ui/IconButton/IconButton';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';

const PlusButton = React.createClass({
    propTypes: {
        isSelected: PropTypes.bool,
        onLike: PropTypes.func.isRequired,
        onUnlike: PropTypes.func.isRequired
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <IconButton
                onClick={this.props.isSelected ? this.props.onUnlike : this.props.onLike}
                iconStyle={{
                    width: 16,
                    height: 16,
                    background: (this.props.isSelected ?
                        this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.accent2Color),
                    color: (this.props.isSelected ?
                        this.context.muiTheme.palette.alternateTextColor : this.context.muiTheme.palette.textColor),
                    borderRadius: 24,
                    padding: 4
                }}
            >
                <PlusOneIcon />
            </IconButton>
        );
    }
});

export default PlusButton;
