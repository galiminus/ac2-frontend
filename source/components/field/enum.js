import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ListItem from 'material-ui/List/ListItem';
import SelectableChip from 'components/selectable-chip';

import InputTitle from './input-title';

const EnumField = React.createClass({
    propTypes: {
        record: PropTypes.string,
        schema: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    renderField() {
        return (
            this.props.schema.enum.map((possibleValue) => {
                return (
                      <SelectableChip
                          key={possibleValue}
                          onTouchTap={() => this.props.onChange(possibleValue)}
                          isSelected={this.props.record === possibleValue}
                      >
                          {this.context.translation.t(`${this.props.label}.${possibleValue}`)}
                      </SelectableChip>
                );
            })
        );
    },

    renderEdit() {
        const valueField = (
            <ListItem
                disabled
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
    },

    renderValue() {
        return (
            <ListItem
                style={{ maxHeight: 80, minHeight: 80 }}
                primaryText={this.props.title}
                secondaryText={<p>{this.props.record || this.context.translation.t('texts.emptyField')}</p>}
            />
        );
    },

    render() {
        return (this.props.editable ? this.renderEdit() : this.renderValue());
    }
});

export default EnumField;
