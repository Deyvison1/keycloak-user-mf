import { initFederation } from '@angular-architects/native-federation';
initFederation(
  {
    'supremenetwork-client-web': 'http://localhost:4200/remoteEntry.json',
  },
  {
    hostRemoteEntry: { url: './remoteEntry.json' },
  },
)
  .then((config) => {
  })
  .catch((err) => console.error('FEDERATION INIT ERROR:', err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
