import React from "react";

import marked from "marked";

const renderer = new marked.Renderer();

const Marked = function(props) {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: false,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        ...(props.options || {})
    });
    return (<div dangerouslySetInnerHTML={{__html: marked(props.body)}} />);
}

export default Marked;
