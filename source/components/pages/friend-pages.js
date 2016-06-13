import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PagesContainer from "./pages-container";

const FriendPages = () => {
  return (
    <PagesContainer type="Page::Profile" />
  );
}

export default FriendPages;