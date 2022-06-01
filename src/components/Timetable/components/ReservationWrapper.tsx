import React from 'react';
import {px} from 'utils/utils';
import {Box} from '@mui/material';

const sx = {
	tableItemContainer: {
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 900,
	},
};

interface Props {
 data: any;
 currentColWidth: number;
	itemOffset: number;
	itemPaddingY: number,
	children: any,
}

const ReservationWrapper = ({ data, currentColWidth, itemOffset, itemPaddingY, children }: Props) => {
	const calculateWidth = () => {
		const { length, withStart, withEnd } = data.meta;
		let chunks = length;
		let margins = 0;
		if (withStart && withEnd) {
			chunks -= 1;
		}
		if (!withStart && !withEnd) {
			chunks += 1;
		}
		if (withStart) {
			margins += 1;
		}
		if (withEnd) {
			margins += 1;
		}
		return currentColWidth * chunks + itemOffset * margins;
	};

	return (
		<Box
			key={data.reservation.id}
			sx={{
				...sx.tableItemContainer,
				width: px(calculateWidth()),
				ml: px(data.meta.withStart ? currentColWidth - itemOffset : 0),
				py: px(itemPaddingY),
			}}
		>
			{children}
		</Box>
	);
};

export default ReservationWrapper;
