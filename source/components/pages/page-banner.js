import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ProfileBanner from 'components/profile/profile-banner';

const PageBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            compact: false
        });
    },

    render() {
        return (
            <ProfileBanner
                page={this.props.page}
                translation={this.props.translation}
                compact={this.props.compact}
            />
        );
    }
});

export default PageBanner;
