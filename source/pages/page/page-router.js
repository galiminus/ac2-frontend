import React, { PropTypes } from 'react';

import UserPage from './user-page';
import StaticPage from './static-page';

const PageRouter = React.createClass({
    propTypes: {
        page: PropTypes.object
    },

    getDefaultProps() {
        return ({
            page: { type: 'main_pages' }
        });
    },

    render() {
        switch (this.props.page.type) {
        case 'main_pages':
        case 'profile_pages':
            return (<UserPage {...this.props} />);

        case 'static_pages':
            return (<StaticPage { ...this.props} />);

        default:
            return (<div />);
        }
    }
});

export default PageRouter;
