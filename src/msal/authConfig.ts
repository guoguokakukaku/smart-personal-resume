/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from '@azure/msal-browser'
import URL from '../env_configuration.json'

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    // Enter_the_Application_Id_Here
    // 已注册应用程序的应用程序（客户端）ID。
    clientId: URL.CLIENT_ID,
    // Enter_the_Cloud_Instance_Id_Here/Enter_the_Tenant_Info_Here
    // Enter_the_Cloud_Instance_Id_Here:在其中注册应用程序的 Azure 云实例。 对于主要（或全球）Azure 云，请输入 https://login.microsoftonline.com。 对于国家/地区云（例如中国云），可以在国家/地区云中找到相应值。
    // Enter_the_Tenant_Info_Here:设置为以下选项之一：如果应用程序支持此组织目录中的帐户，请将此值替换为目录（租户）ID 或租户名称（例如 contoso.microsoft.com）。 如果应用程序支持“任何组织目录中的帐户”，请将此值替换为 organizations。 如果应用程序支持“任何组织目录中的帐户和个人 Microsoft 帐户”，请将此值替换为 common。 若要限制对“仅限个人 Microsoft 帐户”的支持，请将此值替换为 consumers。
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: URL.REDIRECT_URL,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
    },
  },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  // scopes: ["User.Read"]
  scopes: ['User.Read', 'Files.Read', 'Files.Read.All', 'Sites.Read.All'],
  // user.read files.read files.read.all sites.read.all
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  // Enter_the_Graph_Endpoint_Here/v1.0/me
  // 应用程序应与之通信的 Microsoft Graph API 实例。 对于全球 Microsoft Graph API 终结点，请将此字符串的两个实例都替换为 https://graph.microsoft.com。 对于国家/地区云部署中的终结点，请参阅 Microsoft Graph 文档中的国家/地区云部署。
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}
