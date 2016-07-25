import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Dialog from 'material-ui/Dialog';
import ListItem from 'material-ui/List/ListItem';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const DictionnaryItem = React.createClass({
    propTypes: {
        itemKey: PropTypes.string.isRequired,
        itemValue: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onDestroy: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return { editDialogOpen: false };
    },

    handleOpenEditDialog() {
        this.setState({
            editDialogOpen: true,
            itemKey: this.props.itemKey,
            itemValue: this.props.itemValue
        });
    },

    handleRequestClose() {
        this.setState({ editDialogOpen: false });
    },

    handleItemKeyChange(event) {
        this.setState({ itemKey: event.target.value });
    },

    handleItemValueChange(event) {
        this.setState({ itemValue: event.target.value });
    },

    handleDestroy() {
        return (
            this.props.onDestroy().then(() => {
                this.handleRequestClose();
            })
        );
    },

    handleUpdate() {
        return (
            this.props.onChange(this.state.itemKey, this.state.itemValue).then(() => {
                this.handleRequestClose();
            })
        );
    },

    render() {
        return (
            <div>
                <ListItem
                    style={{ maxHeight: 80, minHeight: 80 }}
                    primaryText={this.props.itemKey}
                    secondaryText={this.props.itemValue}
                    onTouchTap={this.props.editable ? this.handleOpenEditDialog : undefined}
                    rightIcon={this.props.editable ? <EditIcon /> : undefined}
                />
                <Dialog
                    open={this.state.editDialogOpen}
                    onRequestClose={this.handleRequestClose}
                    actions={
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div>
                                <FlatButton
                                    label={this.context.translation.t('actions.destroy')}
                                    onClick={this.handleDestroy}
                                />
                            </div>
                            <div>
                                <FlatButton
                                    label={this.context.translation.t('actions.cancel')}
                                    onClick={this.handleRequestClose}
                                />
                                <FlatButton
                                    type="submit"
                                    label={this.context.translation.t('actions.update')}
                                    onTouchTap={this.handleUpdate}
                                    secondary
                                />
                            </div>
                        </div>
                    }
                >
                    <TextField
                        fullWidth
                        value={this.state.itemKey}
                        onChange={this.handleItemKeyChange}
                        floatingLabelText={this.context.translation.t('forms.dictionnary.key')}
                    />
                    <TextField
                        fullWidth
                        value={this.state.itemValue}
                        onChange={this.handleItemValueChange}
                        floatingLabelText={this.context.translation.t('forms.dictionnary.value')}
                    />
                </Dialog>
            </div>
        );
    }
});

export default DictionnaryItem;
