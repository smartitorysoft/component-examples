import { createTheme } from '@mui/material';

import typography from 'theme/typography';
import palette from 'theme/palette';
import components from 'theme/components';

const theme = createTheme({
	typography,
	palette,
	components,
});

export default theme;
