import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

import { connect } from 'react-redux';

import Pages from './pages';

import api from 'api';
import actionCreators from 'action-creators';

function mapStateToProps(state, props) {
    const mappedProps = {};

    if (props.filters && props.filters.type) {
        mappedProps.pages = state.pagesByType.get(props.filters.type);
    } else {
        mappedProps.pages = state.pages;
    }

    mappedProps.translation = state.translations.get(state.currentLocale);

    return (mappedProps);
}

const defaultProps = {
    pages: Immutable.Map({}),
    filters: {}
};

const PagesContainer = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        pushNotification: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return {
            page: 1,
            loadingMore: false,
            hasMore: false
        };
    },

    componentDidMount() {
        this.loadPages(1);
    },

    loadPages(pageNum) {
        const query = {};

        if (this.props.filters.type) {
            query['filter[type]'] = this.props.filters.type;
        }
        query['page[number]'] = pageNum;
        query['page[size]'] = 10;

        this.setState({ loadingMore: true });

        api.pages.find(query)
            .then(
                (response) => {
                    this.setState({ hasMore: !!(response.links && response.links.next), loadingMore: false });
                },
                () => {
                    this.props.pushNotification('pages_find_fatal_error');
                }
            );
    },

    handleLoadMore() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadPages(nextPage);
    },

    render() {
        let pages = [];

        pages = this.props.pages.filter((page) => {
            let match = true;

            if (page.id === this.props.currentUserPage.id) {
                return (false);
            }

            if (this.props.filters.type) {
                const typeRegexp = new RegExp(`${this.props.filters.type}$`);

                if (!page.type.match(typeRegexp)) {
                    match = false;
                }
            }

            return (match);
        });

        return (
            <Pages pages={pages} translation={this.props.translation} />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PagesContainer);
