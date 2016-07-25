import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ListItem from 'material-ui/List/ListItem';
import SelectableChip from 'components/selectable-chip';

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

    getInitialState() {
        return { selected: null };
    },

    handleTouchTap(value) {
        this.setState({ selected: value });
        return (this.props.onChange(value));
    },

    renderField() {
        return (
            this.props.schema.enum.map((possibleValue) => {
                const isSelected = this.props.record === possibleValue || this.state.selected === possibleValue;
                return (
                      <SelectableChip
                          key={possibleValue}
                          onTouchTap={() => this.handleTouchTap(possibleValue)}
                          isSelected={isSelected}
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
                onMouseEnter={this.setMouseInside}
                onMouseLeave={this.setMouseOutside}
                primaryText={
                    <div>
                        {this.props.title}
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
