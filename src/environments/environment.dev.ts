export const environment = {
  production: false,
  apiUrl: 'http://localhost:8085/api/v1',
  keycloakConfig: {
    url: 'https://auth.animal-adoption.com.br',
    realm: 'MY_KEYCLOAK',
    clientId: 'KEYCLOAK_INTEGRATION_API_CLIENT_PUBLIC',
    urlAccount: 'https://auth.animal-adoption.com.br/realms/MY_KEYCLOAK/account/',
  },
};
