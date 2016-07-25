import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Chip from 'material-ui/Chip';

const SelectableChip = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired,
        onTouchTap: PropTypes.func,
        onRequestDelete: PropTypes.func,
        isSelected: PropTypes.bool
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Chip
                style={{ margin: '4px 4px 4px 0' }}
                onTouchTap={this.props.onTouchTap}
                onRequestDelete={this.props.onRequestDelete}
                backgroundColor={
                    this.props.isSelected ?
                        this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.accent2Color
                }
                labelColor={
                    this.props.isSelected ?
                    this.context.muiTheme.palette.alternateTextColor : this.context.muiTheme.palette.textColor
                }
            >
                {this.props.children}
            </Chip>
        );
    }
});

export default SelectableChip;
