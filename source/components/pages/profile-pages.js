import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PagesContainer from "./pages-container";

const ProfilePages = () => {
  return (
    <PagesContainer type="Page::Profile" />
  );
}

export default ProfilePages;