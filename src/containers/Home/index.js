import { connect } from 'react-redux';

import HomeContent from './Home';
import { setFullScreen } from './action';

const mapStateToProps = state => ({
  selectedTheme: state.themes.selected,
  markdown: state.textarea.markdown,
});

const mapDispatchToProps = dispatch => ({
  setFullScreen: bool => dispatch(setFullScreen(bool)),
});

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeContent);

export default Home;
