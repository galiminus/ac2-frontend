import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import { Card, CardText } from 'material-ui/Card';

import Marked from 'components/marked/marked';

const Static = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.resource.data.title);
    },

    render() {
        return (
            <Card style={{ minHeight: '100%', marginTop: 56 }}>
                <CardText>
                    <Marked body={this.props.resource.data.body} />
                </CardText>
            </Card>
        );
    }
});

export default connect(undefined, { setTitle })(Static);
