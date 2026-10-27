export const environment = {
  production: true,
  apiUrl: 'https://api-keycloak-integration.supreme-network.site/api/v1',
  keycloakConfig: {
    url: 'https://auth.supreme-network.site',
    realm: 'MY_KEYCLOAK',
    clientId: 'KEYCLOAK_INTEGRATION_API_CLIENT',
    urlAccount: 'https://auth.supreme-network.site/realms/MY_KEYCLOAK/account/',
  },
};

