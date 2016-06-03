import React, { PropTypes } from 'react';

import api from 'api';

import UserPage from './user-page';
import StaticPage from './static-page';

const PageRouter = React.createClass({
    propTypes: {
        page: PropTypes.object
    },

    getDefaultProps() {
        return ({
            page: { type: 'main-pages' }
        });
    },

    render() {
        switch (this.props.page.type) {
        case 'main-pages':
        case 'user-pages':
            return (<UserPage {...this.props} />);

        case 'static-pages':
            return (<StaticPage { ...this.props} />);

        default:
            return (<div />);
        }
    }
});

export default PageRouter;
