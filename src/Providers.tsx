import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import { Routes } from "./navigation/Routes";

interface ProvidersProps {}

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Toast from 'react-native-toast-message';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Routes />
      </PaperProvider>
    </AuthProvider>
  );
};
