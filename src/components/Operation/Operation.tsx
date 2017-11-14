import * as React from 'react';
import styled from '../../styled-components';

import { observer } from 'mobx-react';

import { H2, MiddlePanel, RightPanel, Badge } from '../../common-elements';

import { Markdown } from '../Markdown/Markdown';
import { Parameters } from '../Parameters/Parameters';
import { ResponsesList } from '../Responses/ResponsesList';
import { RequestSamples } from '../RequestSamples/RequestSamples';
import { ResponseSamples } from '../ResponseSamples/ResponseSamples';
import { ShareLink } from '../../common-elements/linkify';
import { Endpoint } from '../Endpoint/Endpoint';

import { OperationModel as OperationType } from '../../services/models';

const OperationRow = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding-bottom: 30px;
  transform: translateZ(0);
  display: flex;
  overflow: hidden;
  positioin: relative;
`;

interface OperationProps {
  operation: OperationType;
}

@observer
export class Operation extends React.Component<OperationProps> {
  render() {
    const { operation } = this.props;

    const { name: summary, description, deprecated } = operation;

    return (
      <OperationRow>
        <MiddlePanel>
          <H2>
            <ShareLink href={'#' + operation.getHash()} />
            {summary} {deprecated && <Badge type="warning"> Deprecated </Badge>}
          </H2>
          {description !== undefined && <Markdown source={description} />}
          <Parameters parameters={operation.parameters} body={operation.requestBody} />
          <ResponsesList responses={operation.responses} />
        </MiddlePanel>
        <RightPanel>
          <Endpoint operation={operation} />
          <RequestSamples operation={operation} />
          <ResponseSamples operation={operation} />
        </RightPanel>
      </OperationRow>
    );
  }
}