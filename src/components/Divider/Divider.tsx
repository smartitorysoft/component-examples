import React from 'react';
import { Box } from '@mui/material';

const sx = {
	root: {
		flex: 1,
		height: '1px',
		backgroundColor: 'text.primaryLightest',
	},
};

interface Props {
	style?: object;
}

const Divider = ({ style = {} }: Props) => <Box sx={{ ...sx.root, ...style }} />;

export default Divider;
