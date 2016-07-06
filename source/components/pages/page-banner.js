import React, { PropTypes } from 'react';

import ProfileBanner from 'components/profile/profile-banner';

const PageBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        children: PropTypes.node
    },

    render() {
        if (this.props.page.type.match(/^Page::Profile/)) {
            return (
                <ProfileBanner {...this.props} />
            );
        }
        return (<div />);
    }
});

export default PageBanner;
