import React from 'react';
import { Box, Typography } from '@mui/material';
import {IReservation} from 'data/dummy-timetable-data';
import categoryPalette from 'data/category-palette.json';

const BORDER_RADIUS = '14px';

const sx = {
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		pl: '5px',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '0 5px',
		overflow: 'hidden',
		cursor: 'pointer',
		pointerEvents: 'auto',
		backgroundColor: '#E4E1F4',
		borderTopWidth: '1.5px',
		borderTopStyle: 'solid',
		borderBottomWidth: '1.5px',
		borderBottomStyle: 'solid',
		borderColor: '#6051BC',
	},
	name: {
		color: '#6051BC',
		fontWeight: 700,
		minWidth: '90px',
		maxWidth: '90px',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
};

interface Props {
	data: IReservation,
	withStart?: boolean,
	withEnd?: boolean,
	onClick: any,
	order: number,
}


const CompactItem = ({
	data,
	withStart = true,
	withEnd = true,
	onClick,
	order,
}: Props) => {
	const getRootStyles = () => {
		const border = `1.5px solid ${categoryPalette[order].dark}`;
		let s: any = {
			...sx.root,
			backgroundColor: categoryPalette[order].lightest,
			borderTop: border,
			borderBottom: border,
		};
		if (withStart) {
			s = {
				...s,
				borderLeft: border,
				borderBottomLeftRadius: BORDER_RADIUS,
				borderTopLeftRadius: BORDER_RADIUS,
			};
		}
		if (withEnd) {
			s = {
				...s,
				borderRight: border,
				borderBottomRightRadius: BORDER_RADIUS,
				borderTopRightRadius: BORDER_RADIUS,
			};
		}
		return s;
	};


	return (
		<Box sx={getRootStyles()} onClick={onClick}>
			<Typography sx={{ ...sx.name, color: categoryPalette[order].darkest }}>{data.clientName}</Typography>
		</Box>
	);
};

export default CompactItem;
