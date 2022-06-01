import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const BORDER_RADIUS = '14px';

const sx = {
	root: {
		width: '100%',
		height: '100%',
		borderTopWidth: '1.5px',
		borderTopStyle: 'solid',
		borderBottomWidth: '1.5px',
		borderBottomStyle: 'solid',
		pt: '8px',
		pb: '8px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		overflow: 'hidden',
		cursor: 'pointer',
		pointerEvents: 'auto',
		backgroundColor: '#E4E1F4',
	},
	bottomContainer: {
		textAlign: 'left',
		pl: '10px',
	},
	name: {
		color: '#6051BC',
		fontWeight: 700,
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
};

interface Data {
	clientName: string,
}

interface Props {
	data: Data,
	withStart: boolean,
	withEnd: boolean,
	onClick: any,
}

const DetailedItem = ({
	data, withStart, withEnd, onClick,
}: Props) => {
	const getRootStyles = (): any => {
		let s: any = sx.root;
		if (withStart) {
			s = {
				...s,
				borderLeft: '1.5px solid #897ECD',
				borderBottomLeftRadius: BORDER_RADIUS,
				borderTopLeftRadius: BORDER_RADIUS,
			};
		}
		if (withEnd) {
			s = {
				...s,
				borderRight: '1.5px solid #897ECD',
				borderBottomRightRadius: BORDER_RADIUS,
				borderTopRightRadius: BORDER_RADIUS,
			};
		}
		return s;
	};

	return (
		<Box sx={getRootStyles()} onClick={onClick}>
			<Box sx={sx.bottomContainer}>
				<Typography sx={sx.name}>{data.clientName}</Typography>
			</Box>
		</Box>
	);
};

DetailedItem.propTypes = {
	data: PropTypes.object.isRequired,
	withStart: PropTypes.bool,
	withEnd: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

DetailedItem.defaultProps = {
	withStart: true,
	withEnd: true,
};

export default DetailedItem;
