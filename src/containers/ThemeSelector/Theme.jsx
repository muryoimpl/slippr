import React from 'react';
import PropTypes from 'prop-types';

import { ThemeClasses } from './constant';
import { get } from '../../utils/localStorage';

class Theme extends React.Component {
  componentDidMount() {
    const { selectTheme } = this.props;
    const previousSelected = get('theme');
    if (previousSelected) selectTheme(previousSelected);
  }

  render() {
    const { selected, selectAndSaveTheme } = this.props;

    return (
      <select className="form-control p-theme__selectbox" value={selected} onChange={e => selectAndSaveTheme(e.target.value)}>
        {ThemeClasses.map(theme => (
          <option value={theme} key={theme}>{theme}</option>
        ))}
      </select>
    );
  }
}

Theme.propTypes = {
  selected: PropTypes.string,
  selectTheme: PropTypes.func.isRequired,
  selectAndSaveTheme: PropTypes.func.isRequired,
};

Theme.defaultProps = {
  selected: '',
};

export default Theme;
