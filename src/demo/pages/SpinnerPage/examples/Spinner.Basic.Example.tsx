import * as React from 'react';
import {
  Label,
  Spinner,
  SpinnerType
} from '../../../../components/index';
import './Spinner.Basic.Example.scss';

export default class BasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSpinnersExample'>
        <Label>Normal Spinner</Label>
        <Spinner />

        <Label>Large Spinner</Label>
        <Spinner type={ SpinnerType.large }/>

        <Label>Spinner With Label</Label>
        <Spinner label="Loading..." />

        <Label>Large Spinner With Label</Label>
        <Spinner type={ SpinnerType.large } label="Loading..."/>
      </div>
    );
  }
}