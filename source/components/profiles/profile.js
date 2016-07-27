import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import PageForm from 'components/pages/page-form';

import ProfileBanner from 'components/profiles/profile-banner';

const Profile = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({ loading: false });
    },

    componentWillMount() {
        this.props.setTitle(this.props.resource.title);
    },

    render() {
        return (
            <div style={{ marginTop: 16 }}>
                <ProfileBanner page={this.props.resource} />
                <PageForm
                    label="profiles"
                    model="Page::Profile"
                    resource={this.props.resource}
                    editable={this.props.resource.permissions.update}
                />
            </div>
        );
    }
});

export default connect(undefined, actionCreators)(Profile);
