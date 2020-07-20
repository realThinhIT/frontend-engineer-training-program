import RequestError from '../utils/requestError';

export default () => next => async action => {
  const { type, promise, ...rest } = action;

  // If promise isn't defined, pass the middleware.
  if (!promise) {
    return next(action);
  }

  // Define corresponding actions
  const successAction = `${type}_SUCCESS`;
  const failureAction = `${type}_FAILURE`;

  // Continue the request action
  next({ type, ...rest });

  // Begins the request to fetch data
  let result;
  let nextAction;
  let response = {};

  try {
    response = await promise;

    if (response.ok === true) {
      // In case it is resolved, dispatch success action.
      const payload = await response.json();

      nextAction = {
        ...rest,
        type: successAction,
        payload
      };

      result = {
        success: true,
        res: response
      };
    } else {
      // Adapter to make response the same as Error
      const details = await response.json();
      const requestError = new RequestError(details.message, details);

      // In case the request failed, dispatch failed action.
      nextAction = {
        ...rest,
        type: failureAction,
        payload: requestError
      };

      result = {
        success: false,
        error: requestError
      };
    }
  } catch (e) {
    const error = new RequestError('There was some error during fetching data. Please try again later.');

    nextAction = {
      ...rest,
      type: failureAction,
      payload: error
    };

    result = {
      success: false,
      error
    };
  }

  next(nextAction);

  return result;
};
