import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import ProfileBanner from 'components/profile/profile-banner';

const MessagePage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.page.title);
    },

    render() {
        return (
            <div>
                <ProfileBanner page={this.props.page} translation={this.props.translation} />
                {React.cloneElement(this.props.children, { ...this.props, key: undefined })}
            </div>
        );
    }
});

export default connect(undefined, { setTitle })(MessagePage);
