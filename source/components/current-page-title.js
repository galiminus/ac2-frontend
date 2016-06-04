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
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    render() {
        let title;

        if (!this.props.page) {
            return (<span />);
        }

        switch (this.props.page.type) {
        case 'main_pages':
            title = this.context.translation.t('links.mainFeed');
            break;
        case 'profile_pages':
            title = this.props.page.data.personal_informations.full_name;
            break;
        case 'static_pages':
            title = this.props.page.data.title;
            break;
        default:
            title = '';
        }

        return (
            <ToolbarTitle style={style} text={title} />
        );
    }
});

export default connect(mapStateToProps)(CurrentPageTitle);
