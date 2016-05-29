import React, { PropTypes } from "react";

import { ToolbarTitle } from "material-ui";
import { title } from "config";

import CSSModules from 'react-css-modules';
import styles from './additional-links.css';

import { additionalLinks } from "config";

const AdditionalLinks = React.createClass({
    contextTypes: {
        translation: PropTypes.object.isRequired
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
                    <a>Déconnexion</a>
                </li>
            </ul>
        );
    }
});

export default CSSModules(AdditionalLinks, styles);
