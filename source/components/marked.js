import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './marked.css';

import marked from 'marked';

const renderer = new marked.Renderer();

const Marked = React.createClass({
    propTypes: {
        body: PropTypes.string.isRequired,
        options: PropTypes.object
    },

    getDefaultProps() {
        return ({
            body: ''
        });
    },

    render() {
        marked.setOptions({
            renderer,
            gfm: true,
            tables: false,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            ...(this.props.options || {})
        });
        return (<div dangerouslySetInnerHTML={{ __html: marked(this.props.body) }} />);
    }
});

export default CSSModules(Marked, styles);
