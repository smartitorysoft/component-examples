import React from 'react';
import {Box, Typography} from '@mui/material';
import {px} from 'utils/utils';
import {IDay, IHeaderProps} from 'components/Timetable/Timetable';

const sx = {
	root: {
		display: 'grid',
		gridTemplateColumns: 'minmax(71px, auto) repeat(31, minmax(34px, auto))',
		height: '30px',
		overflow: 'visible',
		zIndex: 10000,
		position: 'sticky',
		top: 0,
		boxShadow: '0px 0px 30px rgba(96, 81, 188, 0.3)',
	},
	corner: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'sticky',
		left: 0,
		backgroundColor: 'text.primaryDarkest',
	},
	cornerText: {
		fontSize: '10px',
		color: 'white',
		fontWeight: 600,
		textTransform: 'uppercase',
		letterSpacing: '-0.8px',
		userSelect: 'none',
	},
	colRoot: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	colContent: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateContainer: {
		width: '21px',
		height: '20px',
		borderRadius: '7px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'text.primaryDarkest',
	},
	todayDateContainer: {
		backgroundColor: 'primary.main',
		color: 'white',
	},
	date: {
		fontWeight: 700,
		color: 'inherit',
		userSelect: 'none',
	},
	day: {
		fontSize: '10px',
		lineHeight: '14px',
		mt: '1px',
		color: 'text.primaryMid',
		userSelect: 'none',
	},
	divider: {
		width: '1px',
		height: '32px',
		backgroundColor: 'text.primaryMid',
	},
};

const normalizeDay = (d: number): number => (d ? d - 1 : 6);

const getToday = () => {
	const d = new Date();
	return (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime().toString();
};

export interface Props {
	days: IDay[];
	height: number,
	gridStyle: object,
	colRef: any,
	headerProps: IHeaderProps;
}

const Header = ({
	days,
	height,
	gridStyle,
	colRef,
	headerProps,
}: Props) => {
	const today = getToday();
	return (
		<Box sx={{ ...sx.root, height: px(height), ...gridStyle }}>
			<Box sx={{ ...sx.corner, ...headerProps.cornerStyle }}>
				<Typography sx={sx.cornerText}>{headerProps.cornerText}</Typography>
			</Box>
			{days.map(({
				date: d, key, value, day,
			}, i) => {
				const rootStyle = {
					height: px(height),
					backgroundColor: headerProps.highlightWeekend && normalizeDay(d.getDay()) > 4 ? 'text.primaryLightest' : '#FFF'
				};
				return (
					<Box ref={!i ? colRef : null} key={key} sx={{ ...sx.colRoot, ...rootStyle }}>
						<Box sx={{ ...sx.colContent }}>
							<Box sx={{ ...sx.dateContainer, ...(key === today ? sx.todayDateContainer : {}) }}>
								<Typography sx={sx.date}>{value}</Typography>
							</Box>
							<Typography sx={sx.day}>{day}</Typography>
						</Box>
						{headerProps.withHeaderDivider && i < days.length - 1 && <Box sx={sx.divider} />}
					</Box>
				);
			})}
		</Box>
	);
};

export default Header;
