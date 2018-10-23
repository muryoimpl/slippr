import React from 'react';
import PropTypes from 'prop-types';

import FullScreenButton from '../FullScreenButton';
import NextPageButton from '../NextPageButton';
import { PREV, NEXT } from '../NextPageButton/constant';

class Footer extends React.Component {
  render() {
    const { fullscreen } = this.props;

    return (
      <footer className={`toolbar toolbar-footer ${fullscreen ? 'c-footer-btn-group__hidden' : 'c-btn-group__disappear'}`}>
        <NextPageButton direction={PREV} />
        <FullScreenButton />
        <NextPageButton direction={NEXT} />
      </footer>
    );
  }
}

Footer.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
};

export default Footer;
