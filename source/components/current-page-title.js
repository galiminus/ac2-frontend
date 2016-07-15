import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { ToolbarTitle } from 'material-ui';

const mainPage = { type: 'Page::Main' };

function mapStateToProps(state) {
    if (state.currentPage === 'main') {
        return ({
            page: mainPage
        });
    } else if (state.currentPage) {
        return ({
            page: state.pages.get(state.currentPage)
        });
    }
    return ({});
}

const style = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    color: '#ffffff'
};

const CurrentPageTitle = React.createClass({
    propTypes: {
        page: PropTypes.object,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        let title;

        if (!this.props.page) {
            return (<span />);
        }

        if (this.props.page.type === 'Page::Main') {
            title = this.props.translation.t('links.mainFeed');
        } else {
            title = this.props.page.title;
        }

        return (
            <ToolbarTitle style={style} text={title} />
        );
    }
});

export default connect(mapStateToProps)(CurrentPageTitle);
