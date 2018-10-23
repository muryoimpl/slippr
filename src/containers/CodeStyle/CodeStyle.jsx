import React from 'react';
import PropTypes from 'prop-types';

import { HighlightTheme } from './constant';
import { get } from '../../utils/localStorage';

class CodeStyle extends React.Component {
  componentDidMount() {
    const { selectHighlightTheme } = this.props;
    const previousSelected = get('highlight');
    if (previousSelected) selectHighlightTheme(previousSelected);
  }

  render() {
    const { selected, selectAndSaveHighlightTheme } = this.props;

    return (
      <select className="form-control p-code-highlight__selectbox" value={selected} onChange={e => selectAndSaveHighlightTheme(e.target.value)}>
        {HighlightTheme.map(theme => (
          <option value={theme} key={theme}>{theme}</option>
        ))}
      </select>
    );
  }
}

CodeStyle.propTypes = {
  selected: PropTypes.string,
  selectHighlightTheme: PropTypes.func.isRequired,
  selectAndSaveHighlightTheme: PropTypes.func.isRequired,
};

CodeStyle.defaultProps = {
  selected: null,
};

export default CodeStyle;
