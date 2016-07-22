import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import api from 'api';
import actionCreators from 'action-creators';
import Form from 'components/form';

function mapStateToProps(state) {
    const page = state.pages.get(state.currentPage);

    return {
        page,
        schema: state.schemas.get(page.schema_id),
        translation: state.translations.get(state.currentLocale)
    };
}

const Profile = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({ loading: false });
    },

    onChange(data) {
        this.setState({ loading: true });
        return (
            api.pages
                .update(this.props.page.id, { data })
                .then((resource) => {
                    this.setState({ loading: false });
                    this.props.addResource(resource);
                })
        );
    },

    render() {
        return (
            <Form
                loading={this.state.loading}
                label="profile"
                record={this.props.page.data}
                schema={this.props.schema.data}
                editable={this.props.page.permissions.update}
                translation={this.props.translation}
                onChange={this.onChange}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Profile);
