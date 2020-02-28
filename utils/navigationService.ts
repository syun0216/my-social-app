import {
  NavigationActions,
  // eslint-disable-next-line no-unused-vars
  StackActions,
  // eslint-disable-next-line no-unused-vars
  NavigationParams,
  // eslint-disable-next-line no-unused-vars
  NavigationNavigateActionPayload,
  // eslint-disable-next-line no-unused-vars
  NavigationScreenProp,
} from 'react-navigation';

let _navigator: NavigationScreenProp<{}>;

function setTopLevelNavigator(navigatorRef: NavigationScreenProp<{}>) {
  _navigator = navigatorRef;
}

const navigate = (routeName: string, params: NavigationParams) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

const navigateWithWholeRouteParmas = (
  params: NavigationNavigateActionPayload
) => {
  _navigator.dispatch(NavigationActions.navigate(params));
};

// const replace = () => {
//   _navigator.dispatch({
//     StackActions.replace()
//   })

const back = () => {
  _navigator.dispatch(NavigationActions.back());
};

// add other navigation functions that you need and export them

export default {
  back,
  navigate,
  navigateWithWholeRouteParmas,
  setTopLevelNavigator,
};
