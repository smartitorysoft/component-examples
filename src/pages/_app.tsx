import React from 'react';
import '../styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme';
import type { AppProps } from 'next/app';

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }: AppProps) => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Component {...pageProps} />
	</ThemeProvider>
);

export default App;
