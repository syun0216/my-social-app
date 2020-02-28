import * as React from 'react';
import { StackActions } from '@react-navigation/native';
import { NavigationParams } from 'react-navigation';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params: NavigationParams) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params: NavigationParams) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
