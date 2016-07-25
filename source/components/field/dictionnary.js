import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import AddIcon from 'material-ui/svg-icons/content/add-circle';

import Subheader from 'material-ui/Subheader';

import DictionnaryItem from './dictionnary-item';
import DictionnaryAddDialog from './dictionnary-add-dialog';

const defaultProps = {
    record: {}
};

const Dictionnary = React.createClass({
    propTypes: {
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        record: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return { addDialogOpen: false };
    },

    handleOpenAddDialog() {
        this.setState({ addDialogOpen: true });
    },

    handleRequestClose() {
        this.setState({ addDialogOpen: false });
    },

    handleItemChange(field, itemKey, itemValue) {
        const newRecord = Object.assign({}, this.props.record);

        delete newRecord[field];
        newRecord[itemKey] = itemValue;

        return (this.props.onChange(newRecord));
    },

    handleItemDestroy(field) {
        const newRecord = Object.assign({}, this.props.record);

        delete newRecord[field];

        return (this.props.onChange(newRecord));
    },

    handleItemCreate(itemKey, itemValue) {
        const newRecord = Object.assign({}, this.props.record);

        newRecord[itemKey] = itemValue;

        return (
            this.props.onChange(newRecord).then(() => {
                this.handleRequestClose();
            })
        );
    },

    render() {
        const fields = [];
        for (const field of Object.keys(this.props.record).sort()) {
            fields.push(
                <DictionnaryItem
                    key={field}
                    itemKey={field}
                    itemValue={this.props.record[field]}
                    onChange={(itemKey, itemValue) => this.handleItemChange(field, itemKey, itemValue)}
                    onDestroy={() => this.handleItemDestroy(field)}
                    editable={this.props.editable}
                />
            );
        }
        return (
            <List>
                <Subheader>{this.props.title}</Subheader>
                <ListItem
                    primaryText={this.context.translation.t('forms.dictionnary.add')}
                    rightIcon={<AddIcon />}
                    onTouchTap={this.handleOpenAddDialog}
                />
                {fields}
                <DictionnaryAddDialog
                    open={this.state.addDialogOpen}
                    onRequestClose={this.handleRequestClose}
                    onCreate={this.handleItemCreate}
                />
            </List>
        );
    }
});

export default Dictionnary;
