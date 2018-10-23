/* eslint-disable max-len */
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import emojify from 'emojify.js';
import markdownitLinkTarget from 'markdown-it-link-target';

import { WIDE } from '../containers/AspectRatioSelector/constant';

function getMarkdownInstance() {
  return new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
        } catch (__) {
          console.log('render error'); // eslint-disable-line no-console
        }
      }
      return '';
    },
  }).use(markdownitLinkTarget).set({ idx: 0 });
}

function emojifyInstance() {
  emojify.setConfig({ img_dir: '../assets/images/emoji', ignore_emoticons: true });
  return emojify;
}

export function renderHtmlPreview(markdown, theme) {
  const md = getMarkdownInstance();
  const dblEvent = 'document.getElementById(\'pv\').dataset.index = this.dataset.index; document.getElementById(\'pv\').click();';

  md.renderer.rules.hr = (tokens, index, options) => {
    const idx = options.idx + 1;
    return (`</div></div><div class="p-preview__separator"></div><div data-index="${idx}" class="p-page-preview ${theme}" ondblclick="${dblEvent}"><div class="p-page__inner">`); // eslint-disable-line max-len
  };

  return md.render(
    emojifyInstance().replace(`<div data-index="${md.options.idx}" class="p-page-preview ${theme}" ondblclick="${dblEvent}"><div class="p-page__inner">\n\n${markdown || ''}</div></div>`),
  );
}

export function renderHtmlPage(markdown) {
  const md = getMarkdownInstance();

  return md.render(emojifyInstance().replace(markdown));
}

export function renderPrintHtmlPage(markdown, theme, ratio) {
  const md = getMarkdownInstance();

  const pageClass = ratio === WIDE ? 'p-page__print__wide' : 'p-page__print';

  md.renderer.rules.hr = () => (`</div></div><div class="${pageClass} ${theme}"><div class="p-page__inner">`);

  return md.render(emojifyInstance().replace(`<div class="${pageClass} ${theme}"><div class="p-page__inner">\n\n${markdown || ''}</div></div>`));
}
