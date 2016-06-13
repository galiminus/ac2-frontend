import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './additional-links.css';

import actionCreators from 'action-creators';

import { additionalLinks } from 'config';

const AdditionalLinks = React.createClass({
    propTypes: {
        clearTokens: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    handleClearToken() {
        this.props.clearTokens();
    },

    render() {
        return (
            <ul styleName="additionalLinks">
                {
                    additionalLinks.map((additionalLink, index) => {
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

export default connect(null, actionCreators)(CSSModules(AdditionalLinks, styles));
