import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import { batchActions } from 'redux-batched-actions';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader } from 'material-ui/Card';

import { addResource, closeSettingsDialog } from 'action-creators';

import api from 'api';

const Settings = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        settings: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        error: PropTypes.string,
        id: PropTypes.string
    },

    mixins: [PureRenderMixin],

    handleSubmit(fields, dispatch) {
        api.settings.update(this.props.settings.id, {
            data: fields.settings
        }).then((response) => {
            dispatch(batchActions([
                reset('settings'),
                addResource(response),
                closeSettingsDialog()
            ]));
        });
    },

    render() {
        const {
            fields: { settings },
            handleSubmit
        } = this.props;

        return (
            <Card
                style={{ margin: '24px 0', fontSize: '0.9em', lineHeight: '1.4em' }}
            >
                <CardHeader
                    title={this.props.settings.name}
                />
            >
                <TextField
                    style={{ width: '100%' }}
                    type="text"
                    multiLine
                    rows={5}
                    {...settings}
                />
                <FlatButton
                    disabled={settings.invalid}
                    type="submit"
                    label={this.props.translation.t('actions.submit')}
                    secondary
                    onClick={handleSubmit(this.handleSubmit)}
                />
            </Card>
        );
    }
});

export default reduxForm({
    form: 'settings',
    fields: ['settings']
})(Settings);
