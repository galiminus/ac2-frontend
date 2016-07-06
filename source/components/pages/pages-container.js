import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

import { connect } from 'react-redux';

import Pages from './pages';

import api from 'api';

function mapStateToProps(state, props) {
    if (props.filters && props.filters.type) {
        return {
            pages: state.pagesByType.get(props.filters.type)
        };
    }

    return { pages: state.pages };
}

const PagesContainer = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        filters: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            pages: Immutable.Map({}),
            filters: {}
        });
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

        api.pages.find(query).then((response) => {
            this.setState({ hasMore: !!(response.links && response.links.next), loadingMore: false });
        });
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

            if (this.props.filters.type) {
                const typeRegexp = new RegExp(`${this.props.filters.type}$`);

                if (!page.match(typeRegexp)) {
                    match = false;
                }
            }

            return (match);
        });

        return (
            <Pages pages={pages} />
        );
    }
});

export default connect(mapStateToProps)(PagesContainer);
