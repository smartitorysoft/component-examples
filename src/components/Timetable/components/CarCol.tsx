import React from 'react';
import {px} from 'utils/utils';
import categoryPalette from 'data/category-palette.json';
import {Box, Typography} from '@mui/material';
import palette from 'theme/palette';
import {ICar} from 'data/dummy-timetable-data';

const sx = {
	root: {
		position: 'sticky',
		backgroundColor: 'text.primaryLightest',
		left: 0,
		zIndex: 1000,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		px: '4px',
	},
	text: {
		fontSize: '10px',
		lineHeight: '12px',
		textAlign: 'center',
		color: 'text.primaryDarkest',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 3,
	},
};

interface Props {
 car: ICar;
 isLastCar: boolean;
 colHeight: number;
}

const CarCol = ({ car, isLastCar, colHeight }: Props) => {
	const getStyle = () => {
		let s: any =  {
			...sx.root,
			height: px(colHeight),
			backgroundColor: categoryPalette[car.category.order].lightest
		};
		if (!isLastCar) {
			s = { ...s, borderBottom: `1px solid ${palette.text.primaryMid}` };
		}
		return s;
	};

	return (
		<Box sx={getStyle()}>
			<Typography sx={sx.text}>{car.name}</Typography>
		</Box>
	);
};

export default CarCol;
