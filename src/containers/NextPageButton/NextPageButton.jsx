import React from 'react';
import PropTypes from 'prop-types';
import { PREV, NEXT } from './constant';

class NextPageButton extends React.Component {
  title(direction) {
    let str = '';
    if (direction === PREV) str = 'Previous page';
    if (direction === NEXT) str = 'Next page';
    return str;
  }

  disabledClass(direction, idx, pageLength) {
    let ret = '';
    if (direction === PREV) ret = idx === 0 ? 'c-btn__disabled' : '';
    if (direction === NEXT) ret = idx === pageLength - 1 ? 'c-btn__disabled' : '';

    return ret;
  }

  directionClass(direction) {
    return direction === PREV ? 'left' : 'right';
  }

  handlePageTransfer(direction) {
    const { idx, markdownPages, updatePageIndex } = this.props;

    let nextIdx;
    if (direction === PREV) nextIdx = idx > 0 ? idx - 1 : nextIdx;
    if (direction === NEXT) nextIdx = idx < markdownPages.length - 1 ? idx + 1 : nextIdx;

    updatePageIndex(nextIdx);
  }

  render() {
    const { idx, direction, markdownPages } = this.props;

    return (
      <button
        type="button"
        className="c-footer-btn__show"
        onClick={() => this.handlePageTransfer(direction)}
        title={this.title(direction)}
      >
        <span className={`icon icon-${this.directionClass(direction)} ${this.disabledClass(direction, idx, markdownPages.length)}`} />
      </button>
    );
  }
}

NextPageButton.propTypes = {
  idx: PropTypes.number,
  markdownPages: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
  updatePageIndex: PropTypes.func.isRequired,
};

NextPageButton.defaultProps = {
  idx: 0,
  markdownPages: [''],
  direction: '',
};

export default NextPageButton;
