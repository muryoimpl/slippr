import { connect } from 'react-redux';

import AspectRatio from './AspectRatio';
import { selectRatio } from './action';
import { set } from '../../utils/localStorage';

const mapStateToProps = state => ({
  ratio: state.aspectRatio.ratio,
});

const mapDispatchToProps = dispatch => ({
  selectRatio: ratio => (dispatch(selectRatio(ratio))),
  selectAndSaveRatio: (ratio) => {
    set('ratio', ratio);
    dispatch(selectRatio(ratio));
  },
});

const AspectRatioSelector = connect(mapStateToProps, mapDispatchToProps)(AspectRatio);

export default AspectRatioSelector;
