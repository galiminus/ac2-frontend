import React, { PropTypes } from 'react';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import StringField from './string';
import EnumField from './enum';

const Field = React.createClass({
    propTypes: {
        schema: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        switch (this.props.schema.type) {
        case 'string':
            if (this.props.schema.enum) {
                return (<EnumField {...this.props} />);
            }
            return (<StringField {...this.props} />);
        default:
            return (
                <div />
            );
        }
    }
});

export default Field;
