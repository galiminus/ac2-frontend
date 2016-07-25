import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import AddIcon from 'material-ui/svg-icons/content/add';

import SelectableChip from 'components/selectable-chip';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';

import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';

const defaultProps = {
    record: []
};

const ArrayField = React.createClass({
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

    getInitialState() {
        return { addDialogOpen: false };
    },

    handleOpenAddDialog() {
        this.setState({
            addDialogOpen: true,
            newItemValue: ''
        });
    },

    handleRequestClose() {
        this.setState({ addDialogOpen: false });
    },

    handleItemValueChange(event) {
        this.setState({ newItemValue: event.target.value });
    },

    handleRequestDelete(i) {
        const newArray = this.props.record.slice();
        newArray.splice(i, 1);

        return (this.props.onChange(newArray));
    },

    handleRequestAdd() {
        const newArray = this.props.record.slice();
        newArray.push(this.state.newItemValue);

        return (
            this.props.onChange(newArray).then(() => {
                this.handleRequestClose();
            })
        );
    },

    renderChips() {
        return (
            (this.props.record).map((item, i) => {
                return (
                    <SelectableChip
                        key={i}
                        onRequestDelete={this.props.editable ? () => this.handleRequestDelete(i) : undefined}
                    >
                        {item}
                    </SelectableChip>
                );
            })
        );
    },

    renderDialog() {
        return (
            <Dialog
                open={this.state.addDialogOpen}
                onRequestClose={this.handleRequestClose}
                actions={[
                    <FlatButton
                        label={this.props.translation.t('actions.cancel')}
                        onClick={this.handleRequestClose}
                    />,
                    <FlatButton
                        type="submit"
                        label={this.props.translation.t('actions.add')}
                        onTouchTap={this.handleRequestAdd}
                        secondary
                    />
                ]}
            >
                <TextField
                    fullWidth
                    value={this.state.newItemValue}
                    onChange={this.handleItemValueChange}
                    floatingLabelText={this.props.translation.t('forms.array.add')}
                />
            </Dialog>
        );
    },

    renderAddChip() {
        return (
            <SelectableChip
                onTouchTap={this.handleOpenAddDialog}
            >
                <Avatar icon={<AddIcon />} />
                {this.props.translation.t('forms.array.add')}
            </SelectableChip>
        );
    },

    render() {
        return (
            <ListItem
                disabled
                primaryText={
                    <div>
                        {this.props.title}
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {this.renderChips()}
                            {this.props.editable && this.renderAddChip()}
                        </div>
                        {this.renderDialog()}
                    </div>
                }
            />
        );
    }
});

export default ArrayField;
