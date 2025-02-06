import { useIntl } from 'react-intl';
import { formatIOMessage } from 'vtex.native-types';

const iOMessage: any = ({ values, ...messageDescriptor }: any) => {
  const intl = useIntl();

  const message = formatIOMessage({ intl, ...messageDescriptor }, values);

  return message === '' ? null : { message };
};

export default iOMessage;
