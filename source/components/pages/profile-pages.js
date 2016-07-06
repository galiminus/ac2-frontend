import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PagesContainer from './pages-container';

const ProfilePages = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Profile' }} />
        );
    }
});

export default ProfilePages;
