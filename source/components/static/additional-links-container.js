import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PagesContainer from 'components/pages/pages-container';
import AdditionalLinks from 'components/static/additional-links';

const AdditionalLinksFactory = React.createFactory(AdditionalLinks);

const AdditionalLinksContainer = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <PagesContainer {...this.props} filters={{ type: 'Page::Static' }} factory={AdditionalLinksFactory} />
        );
    }
});

export default AdditionalLinksContainer;
