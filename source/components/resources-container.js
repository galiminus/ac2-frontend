import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

import { connect } from 'react-redux';

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
    resources: Immutable.Map({})
};

const ResourcesContainer = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        find: PropTypes.func.isRequired,
        model: PropTypes.string,
        pushNotification: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        factory: PropTypes.func.isRequired
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

        this.props.find(query)
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
                    this.props.pushNotification('resources_find_fatal_error');
                }
            );
    },

    handleLoadMore() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadPages(nextPage);
    },

    render() {
        let resources = [];

        resources = this.props.resources.filter((resource) => {
            if (this.state.ids.indexOf(resource.id) < 0) {
                return (false);
            }

            if (this.props.model) {
                const typeRegexp = new RegExp(`${this.props.model}$`);

                if (!resource.type.match(typeRegexp)) {
                    return (false);
                }
            }

            return (true);
        });

        return (
            this.props.factory(
                {
                    ...this.props,
                    resources,
                    onLoadMore: this.handleLoadMore,
                    hasMore: this.state.hasMore,
                    loadingMore: this.state.loadingMore
                }
            )
        );
    }
});

export default connect(mapStateToProps, actionCreators)(ResourcesContainer);
