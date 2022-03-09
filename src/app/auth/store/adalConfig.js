import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
    tenant: '<fill>',
    clientId: '<fill>',
    redirectUri: window.location.origin,
    endpoints: {
        api: '406e9139-ff3f-4b2c-82ee-2fb90de28e97'
    },
    cacheLocation: 'localStorage',
    navigateToLoginRequestUrl: false,
    extraQueryParameter: 'scope=user.read'
};
export const authContext = new AuthenticationContext(adalConfig);
export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
