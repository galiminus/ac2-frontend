import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import api from 'api';

import ResourcesContainer from 'components/resources-container';

const PagesContainer = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourcesContainer {...this.props}
                find={api.pages.find}
                storeName="pages"
            />
        );
    }
});

export default PagesContainer;
