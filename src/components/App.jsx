import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import HighlightCssLink from './HighlightCssLink';
import DesignSelectors from './DesignSelectors';
import AspectStyle from './AspectStyle';

class App extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="window">
        <Header />
        <DesignSelectors />
        <HighlightCssLink />
        <AspectStyle />
        <div className="window-content">
          { children }
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
};

App.defaultProps = {
  children: null,
};

export default App;
