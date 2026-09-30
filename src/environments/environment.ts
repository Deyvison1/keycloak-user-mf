export const environment = {
  production: true,
  apiUrl: 'http://localhost:8085/api/v1',
  keycloakConfig: {
    url: 'https://auth.animal-adoption.com.br',
    realm: 'MY_KEYCLOAK',
    clientId: 'KEYCLOAK_INTEGRATION_API_CLIENT',
    urlAccount: 'https://auth.animal-adoption.com.br/realms/MY_KEYCLOAK/account/',
  },
};
