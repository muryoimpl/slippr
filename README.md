# Slippr

[![](https://github.com/muryoimpl/slippr/blob/master/assets/images/icons/png/128x128.png)](https://github.com/muryoimpl/slippr)

markdown presentation app by Electron

## Install

To install Slippr, use [yarn](https://yarnpkg.com/)

```console
$ git clone https://github.com/muryoimpl/slippr.git
$ cd slippr
$ yarn
```

see also [release page](https://github.com/muryoimpl/slippr/releases) for Slippr packages

You can also run Slippr using `yarn run start`.

```console
$ yarn run start # build CSS, transpile JavaScript and start Electron
```

## Usage

### In Editing Page:

You can use Emoji like `:+1:` in textarea and Slippr suggests emoji when entering `:` in textarea.

| buttons    |   |
| ---------- | - |
| open       | open file dialog |
| save as    | save text in textarea as markdown file |
| overwrite  | overwrite the markdown file if you open or save the file before |
| print      | print the converted HTML from markdown to PDF |
| hide/show icons | toggle icons in Slide page whether icons displaying |
| open timer | open timer page as child window |
| full screen | open Slide page |

| select-boxes |   |
| ------------ | - |
| aspect ratio | change the aspect ratio of preview, slide and printed PDF |
| theme        | change background theme of preview, slide and printed PDF |
| highlight    | change code highlight theme of preview, slide page and printed PDF |

Slippr uses [Hue.css](https://github.com/evankarageorgos/hue),  [Highlight.js](https://github.com/isagalaev/highlight.js) and [Google Noto Font](https://www.google.com/get/noto/). :smile:

**If you double-click a preview page, it opens the page on the Slide page.**

### In Slide Page:

| key |   |
| --- | - |
| Up  | previous page |
| Right | next page |
| Down | next page |
| Left | previous page |
| Esc | go back to Editing page |


### In Timer page:

| buttons |   |
| --- | - |
| RESET | set 00:05:00 to Timer |
| CLEAR | set 00:00:00 to timer |
| START | start timer |
| STOP | stop timer |

| key |   |
| --- | - |
| Up  | previous page |
| Right | next page |
| Down | next page |
| Left | previous page |

## exmaple

Please see [exmaple](https://github.com/muryoimpl/slippr/tree/master/example) directory. :eyes:

- [example/pages-16x9.pdf](https://github.com/muryoimpl/slippr/blob/master/example/pages-16x9.pdf)
- [example/pages-4x3.pdf](https://github.com/muryoimpl/slippr/blob/master/example/pages-4x3.pdf)


## License

[MIT](https://github.com/muryoimpl/slippr/blob/master/LICENSE)
