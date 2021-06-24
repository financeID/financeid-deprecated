# financeID

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a quicker way to start with Expo + Firebase projects. It includes:

- based on Expo SDK `40.x.x`
- navigation using `react-navigation` 5.x.x
- Firebase as backend for email auth
- custom and reusable form components
- handles different field types in forms
- handles server errors using Formik
- Login/Signup form built using Formik & yup
- show/hide Password Field's visibility 👁
- uses Context API & checks user's auth state
- implement Password Reset Screen
- all components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

1. Create a new project using the firebase starter template.

```bash
$ npx create-react-native-app --template https://github.com/expo-community/expo-firebase-starter
```

2. Rename the file `example.firebaseConfig.js` to `firebaseConfig.js`
3. Update `firebaseConfig.js` with your own configuration, e.g.:

```js
// Rename this file to "firebaseConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX',
};
```

4. Start the project:

- `yarn ios` -- open on iOS
- `yarn android` -- open on Android
