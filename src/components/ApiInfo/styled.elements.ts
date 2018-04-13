import styled from '../../styled-components';

import { H1, MiddlePanel } from '../../common-elements';

const delimiterWidth = 15;

export const ApiInfoWrap = MiddlePanel;

export const ApiHeader = H1.extend`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

export const DownloadButton = styled.a`
  background-color: ${props => props.theme.colors.brand};
  color: #FFFFFF!important;
  font-size 13px;
  font-weight: 600;
  margin-left: 0.5em;
  padding: 10px 24px;
  display: inline-block;
  border-radius: 3px;
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.brandDark};
  }
`;

export const InfoSpan = styled.span`
  &::before {
    content: '|';
    display: inline-block;
    opacity: 0.5;
    width: ${delimiterWidth}px;
    text-align: center;
  }

  &:last-child::after {
    display: none;
  }
`;

export const InfoSpanBoxWrap = styled.div`
  overflow: hidden;
`;

export const InfoSpanBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  // hide separator on new lines: idea from https://stackoverflow.com/a/31732902/1749888
  margin-left: -${delimiterWidth}px;
`;
