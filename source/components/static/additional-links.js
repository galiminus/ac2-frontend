import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './additional-links.css';

const AdditionalLinks = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ul styleName="additionalLinks">
                {
                    this.props.resources.valueSeq().map((page, index) => {
                        return (
                            <li key={index}>
                                <a
                                    target="_blank"
                                    style={{
                                        color: this.context.muiTheme.palette.accent3Color
                                    }}
                                    href={`/statics/${page.slug}`}
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

export default CSSModules(AdditionalLinks, styles);
