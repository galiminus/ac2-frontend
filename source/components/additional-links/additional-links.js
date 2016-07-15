import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './additional-links.css';

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
        additionalLinks: PropTypes.array.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            additionalLinks: []
        });
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
                                    {this.props.translation.t(additionalLink.name)}
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
});

export default connect(mapStateToProps)(CSSModules(AdditionalLinks, styles));
