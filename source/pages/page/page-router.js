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
        if (this.props.page.type === 'main_pages' ||
            this.props.page.type.match(/^pages.profile_pages/)) {
            return (<UserPage {...this.props} />);
        } else if (this.props.page.type === 'static_pages') {
            return (<StaticPage { ...this.props} />);
        }

        return (<div />);
    }
});

export default PageRouter;
