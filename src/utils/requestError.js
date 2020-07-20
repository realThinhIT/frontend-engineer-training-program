export default class RequestError extends Error {
  constructor(message, details = {}, exception = {}) {
    super(message);

    this.name = 'RequestError';
    this.exception = exception;
    this.errors = details.errors || {};
  }
}

export const parseErrors = requestError => {
  let messages = [];

  if (requestError.errors) {
    for (const key of Object.keys(requestError.errors)) {
      if (requestError.errors[key]) {
        messages = [
          ...messages,
          ...requestError.errors[key]
        ];
      }
    }
  }

  return messages;
};
