import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HighlightTheme } from '../constants/highlightClass';

import * as codeStyleActions from '../actions/codeStyle';
import * as storage from '../utils/localStorage';

class CodeStyle extends React.Component {
  componentDidMount() {
    const { store } = this.context;

    const previousSelected = storage.get('highlight');
    if (previousSelected) {
      store.dispatch(codeStyleActions.selectHighlightTheme(previousSelected));
    }
  }

  handleSelectHighlightTheme(e) {
    const { store } = this.context;

    storage.set('highlight', e.target.value);
    store.dispatch(codeStyleActions.selectHighlightTheme(e.target.value));
  }

  render() {
    const { selected } = this.props;

    return (
      <select className="form-control p-code-highlight__selectbox" value={selected} onChange={e => this.handleSelectHighlightTheme(e)}>
        {HighlightTheme.map(theme => (
          <option value={theme} key={theme}>{theme}</option>
        ))}
      </select>
    );
  }
}

CodeStyle.propTypes = {
  selected: PropTypes.string,
};

CodeStyle.defaultProps = {
  selected: null,
};

CodeStyle.contextTypes = {
  store: PropTypes.object,
};

export default connect(state => ({
  selected: state.codeStyles.selected,
}))(CodeStyle);
