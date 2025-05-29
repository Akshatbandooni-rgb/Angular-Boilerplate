export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  auth: {
    clientId: 'your-client-id',
    authority: 'https://login.microsoftonline.com/your-tenant-id',
    redirectUri: 'http://localhost:4200',
    scopes: ['user.read', 'api://your-api-scope'],
    protectedResources: {
      'https://api.your-domain.com': ['api://your-api-scope'],
    },
  },
};
