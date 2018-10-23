import { connect } from 'react-redux';

import Theme from './Theme';
import { selectTheme } from './action';
import { set } from '../../utils/localStorage';

const mapStateToProps = state => ({
  selected: state.themes.selected,
});

const mapDispatchToProps = dispatch => ({
  selectTheme: name => dispatch(selectTheme(name)),
  selectAndSaveTheme: (name) => {
    set('theme', name);
    dispatch(selectTheme(name));
  },
});

const ThemeSelector = connect(mapStateToProps, mapDispatchToProps)(Theme);

export default ThemeSelector;
