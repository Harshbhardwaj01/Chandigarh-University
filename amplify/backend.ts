import { AddEnvironmentFactory } from '@aws-amplify/backend-function';
import { ConstructFactoryGetInstanceProps, ResourceProvider, FunctionResources } from '@aws-amplify/backend/types/platform';
import { ResourceAccessAcceptorFactory, StackProvider } from '@aws-amplify/plugin-types';
import { myFirstFunction } from './my-first-function/resource';

defineBackend({
  ...
  myFirstFunction,
});

function defineBackend(arg0: { provides?: string; getInstance: (props: ConstructFactoryGetInstanceProps) => ResourceProvider<FunctionResources> & ResourceAccessAcceptorFactory & AddEnvironmentFactory & StackProvider; }) {
  if (!arg0 || typeof arg0.getInstance !== 'function') {
    throw new TypeError('A backend definition with a getInstance function is required.');
  }

  return arg0;
}
