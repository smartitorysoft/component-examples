import React, { useEffect, useRef, useState } from 'react';
import {Box, Button, Typography} from '@mui/material';
import TimetableComponent from 'components/Timetable/Timetable';
import CompactItem from 'components/Timetable/CompactItem';
import { ReactComponent as PrevSm } from 'assets/images/prev-arrow-sm.svg';
import { ReactComponent as NextSm } from 'assets/images/next-arrow-sm.svg';
import palette from 'theme/palette';

const sx = {
	root: {
		height: '100vh',
		px: '25px',
		overflowY: 'scroll',
	},
	content: {
		maxWidth: '1400px',
		mx: 'auto',
	},
	leftControl: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: '20px',
		pl: '6px',
	},
	stepBtn: {
		px: '12px',
		fontWeight: 700,
	},
};

const BTN_COLOR: any = 'darkest';

const Timetable = () => {
	const [calendarHeight, setCalendarHeight] = useState(0);
	const [anchorDate, setAnchorDate] = useState<Date|null>(null);
	// const [referenceDate, setReferenceDate] = useState(new Date().toISOString());

	const calendarRef = useRef<any>(null);

	useEffect(() => {
		setAnchorDate(new Date());
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (calendarRef.current) {
				setCalendarHeight(window.innerHeight - calendarRef.current.getBoundingClientRect().top - 12);
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handlePrev = () => {
		setAnchorDate((d: any) => {
			if (d) {
				return new Date(d.getFullYear(), d.getMonth() - 1, 1);
			}
			return null;
		});
	};

	const handleNext = () => {
		setAnchorDate((d: any) => {
			if (d) {
				return new Date(d.getFullYear(), d.getMonth() + 1, 1);
			}
			return null;
		});
	};

	return (
		<Box sx={sx.root}>
			<Box sx={sx.content}>
				<Box sx={sx.leftControl}>
					<Button
						variant='text'
						color={BTN_COLOR}
						sx={sx.stepBtn}
						startIcon={<PrevSm />}
						onClick={handlePrev}
					>
						Előző
					</Button>
					<Button
						variant='text'
						color={BTN_COLOR}
						sx={sx.stepBtn}
						endIcon={<NextSm color={palette.text.primaryDark} />}
						onClick={handleNext}
					>
						Következő
					</Button>
					{anchorDate &&	<Typography>{anchorDate.toString()}</Typography>}
				</Box>
				<TimetableComponent
					firstColWidth={71}
					colWidth={34}
					colHeight={51}
					headerHeight={51}
					itemPaddingY={5}
					itemOffset={12}
					TableItem={CompactItem}
					style={{ mt: '20px' }}
					anchorDate={anchorDate ? anchorDate : new Date()}
					variant='month'
					height={calendarHeight}
					ref={calendarRef}
				/>
			</Box>
		</Box>
	);
};

export default Timetable;
