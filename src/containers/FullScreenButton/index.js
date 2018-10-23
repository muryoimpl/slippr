import { connect } from 'react-redux';

import FullScreenButtonContent from './FullScreenButton';
import { setFullScreen, clearPages } from '../Page/action';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setFullScreen: bool => dispatch(setFullScreen(bool)),
  clearPages: () => dispatch(clearPages()),
});

const FullScreenButton = connect(mapStateToProps, mapDispatchToProps)(FullScreenButtonContent);

export default FullScreenButton;
