import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { AuthUserProvider } from './AuthUserProvider';
import Routes from './Routes';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <FlashMessage />
      <Routes />
    </AuthUserProvider>
  );
}
