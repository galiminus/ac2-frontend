import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ToolbarTitle } from 'material-ui';

function mapStateToProps(state) {
    if (state.currentPage === 'main') {
        return ({ page: { type: 'main_pages' } });
    } else if (state.currentPage) {
        return ({ page: state.pages.get(state.currentPage) });
    }
    return ({});
}

const style = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    letterSpacing: 3,
    color: '#ffffff'
};

const CurrentPageTitle = React.createClass({
    propTypes: {
        page: PropTypes.object
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return ({
            page: {
                id: null,
                type: ''
            }
        });
    },

    render() {
        let title;

        if (!this.props.page) {
            return (<span />);
        }

        if (this.props.page.type === 'main_pages') {
            title = this.context.translation.t('links.mainFeed');
        } else if (this.props.page.type.match(/^pages.profile_pages/)) {
            title = this.props.page.data.personal_informations.full_name;
        } else if (this.props.page.type === 'static_pages') {
            title = this.props.page.data.title;
        } else {
            title = '';
        }

        return (
            <ToolbarTitle style={style} text={title} />
        );
    }
});

export default connect(mapStateToProps)(CurrentPageTitle);
