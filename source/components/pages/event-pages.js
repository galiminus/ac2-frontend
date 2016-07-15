import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PagesContainer from './pages-container';

const EventPages = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <PagesContainer filters={{ type: 'Page::Event' }} {...this.props} />
        );
    }
});

export default EventPages;
