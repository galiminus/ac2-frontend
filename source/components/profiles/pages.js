import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PagesContainer from 'components/pages/pages-container';
import Profiles from 'components/profiles/profiles';

const ProfilesFactory = React.createFactory(Profiles);

const ProfilePages = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Profile' }} factory={ProfilesFactory} {...this.props} />
        );
    }
});

export default ProfilePages;
