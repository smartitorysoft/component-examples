import React from 'react';
import {Box} from '@mui/material';
import {px} from 'utils/utils';
import palette from 'theme/palette';

const contentHover = {
	cursor: 'pointer',
	'& .hover-indicator': {
		display: 'block',
	},
};

const sx = {
	root: {
		position: 'relative',
		backgroundColor: 'transparent',
		pointerEvents: 'none',
	},
	content: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		position: 'absolute',
		top: 0,
		left: 0,
		pointerEvents: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'&:hover': contentHover,
	},
	hoverIndicator: {
		height: '100%',
		backgroundColor: '#E4E1F4',
		borderTopLeftRadius: '14px',
		borderBottomLeftRadius: '14px',
	},
	hoverIndicatorContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		pointerEvents: 'none',
		display: 'none',
	},
};

interface Props {
	isOccupied: boolean;
	isLastCar: boolean;
	isLastDay: boolean;
	onClick: any;
	currentColWidth: number;
	itemOffset: number;
	itemPaddingY: number,
	children: any,
}

const Cell = ({
	isOccupied,
	isLastCar,
	isLastDay,
	onClick,
	currentColWidth,
	itemOffset,
	itemPaddingY,
	children,
}: Props) => {
	const handleClick = () => {
		if (!isOccupied && onClick) {
			onClick();
		}
	};

	const getStyle = () => {
		let s: object = sx.content;
		s = {
			...s,
			'&:hover': {
				...contentHover,
				cursor: isOccupied ? 'auto' : 'pointer',
			},
		};
		if (!isLastDay) {
			s = { ...s, borderRight: `1px dashed ${palette.text.primaryMid}` };
		}
		if (!isLastCar) {
			s = { ...s, borderBottom: `1px solid ${palette.text.primaryMid}` };
		}
		return s;
	};

	return (
		<Box sx={sx.root}>
			<Box sx={getStyle()} onClick={handleClick}>
				<Box className='hover-indicator' sx={{ ...sx.hoverIndicatorContainer, py: px(itemPaddingY) }}>
					<Box sx={{ ...sx.hoverIndicator, width: px(itemOffset), ml: px(currentColWidth - itemOffset) }} />
				</Box>
			</Box>
			{children}
		</Box>
	);
};

export default Cell;
