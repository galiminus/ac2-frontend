import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './additional-links.css';

import actionCreators from 'action-creators';
import api from 'api';

import Immutable from 'immutable';

function mapStateToProps(state) {
    return ({
        pages: state.pagesByType.get('Page::Static')
    });
}

const defaultProps = {
    pages: Immutable.Map({})
};

const AdditionalLinks = React.createClass({
    propTypes: {
        pages: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    componentWillMount() {
        this.loadPages();
    },

    loadPages() {
        const query = {};

        query['filter[type]'] = 'Page::Static';
        query['page[size]'] = 20;

        api.pages.find(query)
            .then(
                (response) => {
                    this.props.addResource(response);
                },
                () => {
                    this.props.pushNotification('pages_find_fatal_error');
                }
            );
    },

    render() {
        return (
            <ul styleName="additionalLinks">
                {
                    this.props.pages.valueSeq().map((page, index) => {
                        return (
                            <li key={index}>
                                <a
                                    target="_blank"
                                    href={`/${page.slug}`}
                                >
                                    {page.title}
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(CSSModules(AdditionalLinks, styles));
