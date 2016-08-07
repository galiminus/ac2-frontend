import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PagesContainer from 'components/pages/pages-container';
import Profiles from 'components/profiles/profiles';
import MainLayout from 'components/main-layout';

const ProfilesFactory = React.createFactory(Profiles);

const ProfilePages = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <MainLayout
                {...this.props}
                baseUrl="/profiles"
                leftNav={[]}
                tabs={{
                    all: (
                        <PagesContainer
                            filters={{ type: 'Page::Profile' }}
                            factory={ProfilesFactory}
                        />
                    )
                }}
            />
        );
    }
});

export default ProfilePages;
