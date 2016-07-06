import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './additional-links.css';

import actionCreators from 'action-creators';

function mapStateToProps(state) {
    if (state.settings && state.settings.data) {
        return ({
            additionalLinks: state.settings.data.additionalLinks
        });
    }
    return ({});
}

const AdditionalLinks = React.createClass({
    propTypes: {
        clearTokens: PropTypes.func.isRequired,
        additionalLinks: PropTypes.array.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            additionalLinks: []
        });
    },

    handleClearToken() {
        this.props.clearTokens();
    },

    render() {
        return (
            <ul styleName="additionalLinks">
                {
                    this.props.additionalLinks.map((additionalLink, index) => {
                        return (
                            <li key={index}>
                                <a
                                    target="_blank"
                                    href={additionalLink.href}
                                >
                                    {this.context.translation.t(additionalLink.name)}
                                </a>
                            </li>
                        );
                    })
                }
                <li>
                    <a href="#" onClick={this.handleClearToken}>Déconnexion</a>
                </li>
            </ul>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(CSSModules(AdditionalLinks, styles));
