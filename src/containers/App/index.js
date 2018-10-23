import { connect } from 'react-redux';
import AppContent from './AppContent';

const mapStateToProps = state => ({
  fullscreen: state.pages.fullscreen,
  selectedCodeStyle: state.codeStyles.selected,
  ratio: state.aspectRatio.ratio,
});

const mapDispatchToProps = () => ({});

const App = connect(mapStateToProps, mapDispatchToProps)(AppContent);

export default App;
