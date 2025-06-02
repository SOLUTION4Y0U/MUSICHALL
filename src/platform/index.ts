import { usePlatform } from '../hooks/usePlatform';

import * as tmaUiControls from './tma/ui-controls';
import * as browserUiControls from './browser/ui-controls';
import * as tmaPayment from './tma/payment';
import * as browserPayment from './browser/payment';

export const usePlatformUIControls = () => {
  const { isTma } = usePlatform();

  return isTma ? tmaUiControls : browserUiControls;
};

export const usePlatformPayment = () => {
  const { isTma } = usePlatform();

  return isTma ? tmaPayment : browserPayment;
};