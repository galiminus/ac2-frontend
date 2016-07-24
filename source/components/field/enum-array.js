import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Chip from 'material-ui/Chip';

import ListItem from 'material-ui/List/ListItem';

const defaultProps = {
    record: []
};

const EnumField = React.createClass({
    propTypes: {
        record: PropTypes.array,
        schema: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    handleTouchTap(value) {
        const newArray = this.props.record.slice();
        const index = newArray.indexOf(value);

        if (index < 0) {
            newArray.push(value);
        } else {
            newArray.splice(index, 1);
        }

        this.props.onChange(newArray);
    },

    renderField() {
        return (
            this.props.schema.items.enum.map((possibleValue) => {
                const isSelected = this.props.record.indexOf(possibleValue) >= 0;
                return (
                      <Chip
                          key={possibleValue}
                          style={{ margin: '4px 4px 4px 0', display: 'inline-block' }}
                          onTouchTap={this.props.editable ? () => this.handleTouchTap(possibleValue) : undefined}
                          backgroundColor={
                              isSelected ? '#999' : '#cacaca'
                          }
                      >
                          {this.props.translation.t(`${this.props.label}.${possibleValue}`)}
                      </Chip>
                );
            })
        );
    },

    render() {
        const valueField = (
            <ListItem
                disabled
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <div>
                        {this.props.title}
                        <div>
                            {this.renderField()}
                        </div>
                    </div>
                }
            />
        );
        return (valueField);
    }
});

export default EnumField;
