import { css } from '../../styled-components';

export const jsonStyles = css`
  .redoc-json > .collapser {
    display: none;
  }

  font-family: ${props => props.theme.code.fontFamily};
  font-size: ${props => props.theme.code.fontSize};

  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;

  .type-null {
    color: gray;
  }

  .type-boolean {
    color: firebrick;
  }

  .type-number {
    color: #4a8bb3;
  }

  .type-string {
    color: #3BB878;
    & + a {
      color: #3BB878;
      text-decoration: underline;
    }
  }

  .callback-function {
    color: gray;
  }

  .collapser:after {
    content: '-';
    cursor: pointer;
  }

  .collapsed > .collapser:after {
    content: '+';
    cursor: pointer;
  }

  .ellipsis:after {
    content: ' … ';
  }

  .collapsible {
    margin-left: 2em;
  }

  .hoverable {
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 2px;
  }

  .hovered {
    background-color: rgba(235, 238, 249, 1);
  }

  .collapser {
    padding-right: 6px;
    padding-left: 6px;
  }

  ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px 0px 0px 26px;
  }

  li {
    position: relative;
    display: block;
  }

  .hoverable {
    display: inline-block;
  }

  .selected {
    outline-style: solid;
    outline-width: 1px;
    outline-style: dotted;
  }

  .collapsed > .collapsible {
    display: none;
  }

  .ellipsis {
    display: none;
  }

  .collapsed > .ellipsis {
    display: inherit;
  }

  .collapser {
    position: absolute;
    top: 1px;
    left: -1.5em;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
  }
`;
