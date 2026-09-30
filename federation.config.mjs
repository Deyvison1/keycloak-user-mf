import { withNativeFederation, shareAll } from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'keycloak-user-mf',

  remotes: {
    'supremenetwork-client-web': 'http://localhost:4200/remoteEntry.json',
  },

  exposes: {
    './Component': './src/app/app.ts',
    './Routes': './src/app/app.routes.ts',
  },

  shared: {
    ...shareAll(
      {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
        build: 'package',
      },
      {
        overrides: {
          '@angular/core': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            build: 'package',
            includeSecondaries: { keepAll: true },
          },

          '@angular/common': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            build: 'package',
            includeSecondaries: { keepAll: true },
          },

          '@angular/compiler': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            build: 'package',
          },

          '@supremenetwork/ui': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            build: 'package',
          },
        },
      },
    ),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket', '@angular/common/locales/pt'],

  features: {
    denseChunking: true,
  },
});
