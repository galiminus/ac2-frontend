import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

const DictionnaryAddDialog = React.createClass({
    propTypes: {
        open: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        onCreate: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            itemKey: '',
            itemValue: ''
        };
    },

    handleRequestClose() {
        this.setState({
            itemKey: '',
            itemValue: ''
        });
        this.props.onRequestClose();
    },

    handleItemKeyChange(event) {
        this.setState({ itemKey: event.target.value });
    },

    handleItemValueChange(event) {
        this.setState({ itemValue: event.target.value });
    },

    handleCreate() {
        return (this.props.onCreate(this.state.itemKey, this.state.itemValue));
    },

    render() {
        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.handleRequestClose}
                actions={[
                    <FlatButton
                        label={this.props.translation.t('actions.cancel')}
                        onClick={this.handleRequestClose}
                    />,
                    <FlatButton
                        type="submit"
                        label={this.props.translation.t('actions.create')}
                        onTouchTap={this.handleCreate}
                        secondary
                    />
                ]}
            >
                <TextField
                    fullWidth
                    value={this.state.itemKey}
                    onChange={this.handleItemKeyChange}
                    floatingLabelText={this.props.translation.t('forms.dictionnary.key')}
                />
                <TextField
                    fullWidth
                    value={this.state.itemValue}
                    onChange={this.handleItemValueChange}
                    floatingLabelText={this.props.translation.t('forms.dictionnary.value')}
                />
            </Dialog>
        );
    }
});

export default DictionnaryAddDialog;
