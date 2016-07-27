import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PageCreateForm from 'components/pages/page-create-form';

const ProfileNew = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.newProfile'));
    },

    handleSubmit(resource) {
        browserHistory.push(`/groups/${resource.slug}`);
    },

    render() {
        return (
            <PageCreateForm
                type="Page::Profile"
                onSubmit={this.handleSubmit}
            />
        );
    }
});

export default connect(undefined, { setTitle })(ProfileNew);
