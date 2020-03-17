/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const prefix = 'app';

export const TOGGLE_EVENTS_VIEW = `${prefix}/TOGGLE_EVENTS_VIEW`;

export const TOGGLE_MENU_TEXT = `${prefix}/TOGGLE_MENU_TEXT`;

export const SET_LAST_NAMESPACE = `${prefix}/SET_LAST_NAMESPACE`;

export const OPEN_TERMINAL = `${prefix}/OPEN_TERMINAL`;
export const CLOSE_TERMINAL = `${prefix}/CLOSE_TERMINAL`;

export const CLEAR_HTTP_ERROR = `${prefix}/CLEAR_HTTP_ERROR`;
export const HTTP_ERROR = `${prefix}/HTTP_ERROR`;
export const HTTP_CONNECTION_ERROR = `${prefix}/HTTP_CONNECTION_ERROR`;
export const HTTP_CLIENT_ERROR = `${prefix}/HTTP_CLIENT_ERROR`;
export const HTTP_SERVER_ERROR = `${prefix}/HTTP_SERVER_ERROR`;
export const HTTP_UNHANDLED_ERROR = `${prefix}/HTTP_UNHANDLED_ERROR`;
