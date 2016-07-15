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
        if (this.props.page.type.match(/^Page::Profile/)) {
            return (
                <ProfileBanner
                    page={this.props.page}
                    translation={this.props.translation}
                    compact={this.props.compact}
                />
            );
        }
        return (<div />);
    }
});

export default PageBanner;
