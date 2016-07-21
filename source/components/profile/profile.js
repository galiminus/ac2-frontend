import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import api from 'api';
import actionCreators from 'action-creators';
import Form from 'components/form';

function mapStateToProps(state) {
    return {
        page: state.pages.get(state.currentPage),
        translation: state.translations.get(state.currentLocale)
    };
}

const defaultProps = {
    page: {
        schema: {
            properties: {}
        }
    }
};

const Profile = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    onChange(data) {
        return (
            api.pages
                .update(this.props.page.id, { data })
                .then(this.props.addResource)
        );
    },

    render() {
        return (
            <Form
                label="profile"
                record={this.props.page.data}
                schema={this.props.page.schema}
                editable={this.props.page.permissions.update}
                translation={this.props.translation}
                onChange={this.onChange}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Profile);
