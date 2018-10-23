import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import HighlightCssLink from '../../components/HighlightCssLink';
import DesignSelectors from '../../components/DesignSelectors';
import AspectStyle from '../../components/AspectStyle';
import { NORMAL } from '../AspectRatioSelector/constant';

class AppContent extends React.Component {
  render() {
    const {
      children,
      fullscreen,
      selectedCodeStyle,
      ratio,
    } = this.props;

    return (
      <div className="window">
        <Header />
        <DesignSelectors fullscreen={fullscreen} />
        <HighlightCssLink selected={selectedCodeStyle} />
        <AspectStyle ratio={ratio} />
        <div className="window-content">
          { children }
        </div>
        <Footer fullscreen={fullscreen} />
      </div>
    );
  }
}

AppContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  fullscreen: PropTypes.bool.isRequired,
  selectedCodeStyle: PropTypes.string,
  ratio: PropTypes.number,
};

AppContent.defaultProps = {
  children: null,
  selectedCodeStyle: '',
  ratio: NORMAL,
};

export default AppContent;
