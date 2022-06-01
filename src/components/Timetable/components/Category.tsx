import React from 'react';
import {Box, Typography} from '@mui/material';
import categoryPalette from 'data/category-palette.json';
import {ICategory} from 'data/dummy-timetable-data';

const sx = {
	firstCol: {
		position: 'sticky',
		backgroundColor: 'text.primaryLightest',
		left: 0,
		zIndex: 1000,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		pl: '20px',
		height: '22px',
		gridColumn: '1 / 6'
	},
	secondCol: {
		height: '22px',
	},
	text: {
		color: 'white',
		textTransform: 'uppercase',
		fontSize: '10px',
	},
};

interface Props {
	category: ICategory;
	daysCount: number;
}

const Category = ({ category, daysCount }: Props) => {
	const backgroundColor = categoryPalette[category.order].darkest;
	return (
		<>
			<Box sx={{ ...sx.firstCol, backgroundColor }}>
				<Typography sx={sx.text}>{category.name}</Typography>
			</Box>
			<Box sx={{ ...sx.secondCol, gridColumn: `6 / ${daysCount + 2}`, backgroundColor }}>
			</Box>
		</>
	);
};

export default Category;
