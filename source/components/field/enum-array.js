import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import SelectableChip from 'components/selectable-chip';

import ListItem from 'material-ui/List/ListItem';

import InputTitle from './input-title';

const EnumField = React.createClass({
    propTypes: {
        record: PropTypes.array,
        schema: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            record: []
        });
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
                      <SelectableChip
                          key={possibleValue}
                          onTouchTap={this.props.editable ? () => this.handleTouchTap(possibleValue) : undefined}
                          isSelected={isSelected}
                      >
                          {this.context.translation.t(`${this.props.label}.${possibleValue}`)}
                      </SelectableChip>
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
                        <InputTitle>{this.props.title}</InputTitle>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
