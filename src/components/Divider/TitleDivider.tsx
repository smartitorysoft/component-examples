import React from 'react';
import { Box, Typography } from '@mui/material';

const sx = {
	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: '10px',
	},
	title: {
		fontSize: '11px',
		fontWeight: 500,
		textTransform: 'uppercase',
	},
	divider: {
		flex: 1,
		height: '1px',
		backgroundColor: 'text.primaryLightest',
	},
	btn: {
		px: '12px',
	},
};
interface Props {
	title: string | any,
	endComponent?: any,
	style?: object,
	dividerStyle?: object,
}

const TitleDivider = ({
	title = '',
	endComponent = null,
	style = {},
	dividerStyle = {},
}: Props) => (
	<Box sx={{ ...sx.root, ...style }}>
		{typeof title === 'string' ? (
			<Typography sx={sx.title}>{title}</Typography>
		) : (
			<>
				{title}
			</>
		)}
		<Box sx={{ ...sx.divider, ...dividerStyle }} />
		{!!endComponent && (
			<>
				{endComponent}
			</>
		)}
	</Box>
);

export default TitleDivider;
