import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

import { connect } from 'react-redux';

import api from 'api';
import actionCreators from 'action-creators';

function mapStateToProps(state, props) {
    const mappedProps = {};

    if (props.model) {
        mappedProps.pages = state.pagesByType.get(props.model);
    } else {
        mappedProps.pages = state.pages;
    }
    return (mappedProps);
}

const defaultProps = {
    pages: Immutable.Map({})
};

const PagesContainer = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        model: PropTypes.string.isRequired,
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        pushNotification: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return {
            page: 1,
            loadingMore: false,
            hasMore: false,
            ids: []
        };
    },

    componentWillMount() {
        this.loadPages(1);
    },

    loadPages(pageNum) {
        const query = {};

        if (this.props.model) {
            query['filter[type]'] = this.props.model;
        }
        query['page[number]'] = pageNum;
        query['page[size]'] = 10;
        query.include = 'schema';

        this.setState({ loadingMore: true });

        api.pages.find(query)
            .then(
                (response) => {
                    this.props.addResource(response);

                    const ids = response.data.map((page) => page.id);
                    this.setState({
                        ids: [...this.state.ids, ...ids],
                        hasMore: !!(response.links && response.links.next),
                        loadingMore: false
                    });
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
            if (this.state.ids.indexOf(page.id) < 0) {
                return (false);
            }

            if (this.props.model) {
                const typeRegexp = new RegExp(`${this.props.model}$`);

                if (!page.type.match(typeRegexp)) {
                    return (false);
                }
            }

            return (true);
        });

        return (
            React.cloneElement(this.props.children, { pages })
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PagesContainer);
