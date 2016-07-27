import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Link from 'components/link';

import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import PageCardTitle from 'components/pages/page-card-title';

import RelationChip from 'components/relation-chip';

const ProfileBanner = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Card>
                <CardMedia
                    overlay={
                        <PageCardTitle page={this.props.page} titleColor="#fff">
                            <RelationChip
                                proposer={this.context.currentUserPage}
                                recipient={this.props.page}
                            />
                        </PageCardTitle>
                    }
                >
                    <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150" />
                </CardMedia>
                <CardActions style={{ textAlign: 'right' }}>
                    <Link to={`/profiles/${this.props.page.slug}/infos`}>
                        <FlatButton label={this.context.translation.t('labels.about')} />
                    </Link>
                </CardActions>
            </Card>
        );
    }
});

export default ProfileBanner;
