import { ResponseMessage } from '../constants/message.const';

export function responseBuilder(
  payload: any,
  status = 200,
  message = ResponseMessage.success,
  metadata?: any,
) {
  return {
    statusCode: status,
    message,
    data: payload,
    ...metadata,
  };
}
