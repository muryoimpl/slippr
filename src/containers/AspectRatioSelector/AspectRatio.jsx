import React from 'react';
import PropTypes from 'prop-types';

import { ASPECT_RATIO } from './constant';
import { get } from '../../utils/localStorage';

class AspectRatio extends React.Component {
  componentDidMount() {
    const { selectRatio } = this.props;
    const previousSelected = get('ratio');
    if (previousSelected) selectRatio(previousSelected);
  }

  render() {
    const { ratio, selectAndSaveRatio } = this.props;

    return (
      <select className="form-control p-aspect-ratio__selectbox" value={ratio} onChange={e => selectAndSaveRatio(e.target.value)}>
        {ASPECT_RATIO.map(aspectRatio => (
          <option value={aspectRatio.value} key={aspectRatio.value}>{aspectRatio.label}</option>
        ))}
      </select>
    );
  }
}

AspectRatio.propTypes = {
  ratio: PropTypes.number.isRequired,
  selectRatio: PropTypes.func.isRequired,
  selectAndSaveRatio: PropTypes.func.isRequired,
};

export default AspectRatio;
