import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { CardTitle } from 'material-ui/Card';

import PageAvatar from 'components/pages/page-avatar';

const PageCardTitle = React.createClass({
    propTypes: {
        page: PropTypes.object,
        children: PropTypes.node
    },

    mixins: [PureRenderMixin],

    render() {
        if (this.props.page.type.match(/^Page::Profile/)) {
            return (
                <CardTitle
                    titleColor="#fff"
                    style={{ padding: 8 }}
                    title={
                        <div>
                            <PageAvatar
                                page={this.props.page}
                            />
                            {this.props.page.data.personal_informations.full_name}
                        </div>
                    }
                    {...this.props}
                />
            );
        }
        return (<div />);
    }
});

export default PageCardTitle;
