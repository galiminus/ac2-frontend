import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PagesContainer from "./pages-container";

const EventPages = () => {
  return (
    <PagesContainer type="Page::Event" />
  );
}

export default EventPages;