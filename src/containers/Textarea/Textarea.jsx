import React from 'react';
import PropTypes from 'prop-types';

import { set, get } from '../../utils/localStorage';
import { registerEmojiAutoComplete, removeEmojiAutoComplete } from '../../utils/emojiAutoComplete';

class Textarea extends React.Component {
  componentDidMount() {
    const { markdown, editTextareaValue } = this.props;
    const previousValue = get('markdown');
    if (!document.querySelector('#markdown-textarea').value && previousValue) {
      editTextareaValue(previousValue);
    }

    registerEmojiAutoComplete('#markdown-textarea');

    window.onbeforeunload = () => {
      set('markdown', markdown);
    };
  }

  componentWillUnmount() {
    const { markdown } = this.props;
    set('markdown', markdown);
    removeEmojiAutoComplete('ul.dropdown-menu.textcomplete-dropdown');
  }

  // TODO: drag&drop 中に移動した位置に挿入されないのでなんとかしたい
  handleDropImage(e) {
    e.stopPropagation();
    e.preventDefault();
    const { editTextareaValue } = this.props;

    const file = e.dataTransfer.files[0];
    if (file.type.match('image/')) {
      let tag;
      if (e.currentTarget.selectionStart && e.currentTarget.selectionStart !== 0) {
        tag = `\n---\n${this.imgHTMLTag(file.path, file.name)}\n---\n`;
      } else {
        tag = `${this.imgHTMLTag(file.path, file.name)}`;
      }

      const posStart = e.currentTarget.selectionStart;
      const posEnd = e.currentTarget.selectionEnd;
      const text = e.currentTarget.value;
      e.currentTarget.value = `${text.substring(0, posStart)}\n${tag}\n${text.substring(posEnd, text.length)}`;

      editTextareaValue(e.target.value);
    }
  }

  imgHTMLTag(path, name) {
    return `<img src="file://${path}" height="100%" width="100%" alt="${name}">\n`;
  }

  render() {
    const { markdown, editTextareaValue } = this.props;

    return (
      <form className="p-editor__pane">
        <div className="form-group p-editor__pane">
          <textarea
            id="markdown-textarea"
            className="form-control p-editor__textarea"
            rows="10"
            value={markdown}
            onDrop={e => this.handleDropImage(e)}
            onChange={e => editTextareaValue(e.target.value)}
          />
        </div>
      </form>
    );
  }
}

Textarea.propTypes = {
  markdown: PropTypes.string,
  editTextareaValue: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  markdown: '',
};

export default Textarea;
