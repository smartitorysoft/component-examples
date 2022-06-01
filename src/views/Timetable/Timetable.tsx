import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import DetailedItem from 'components/Timetable/DetailedItem';
import TimetableComponent from 'components/Timetable/Timetable';

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
};

const Timetable = () => {
	const [anchorDate] = useState(new Date());
	const [calendarHeight, setCalendarHeight] = useState(0);

	const calendarRef = useRef<any>(null);

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

	return (
		<Box sx={sx.root}>
			<Box sx={sx.content}>
				<TimetableComponent
					firstColWidth={92}
					colWidth={126}
					colHeight={110}
					headerHeight={51}
					itemPaddingY={10}
					itemOffset={49}
					TableItem={DetailedItem}
					style={{ mt: '20px' }}
					anchorDate={anchorDate}
					highlightWeekend={false}
					variant='week'
					height={calendarHeight}
					ref={calendarRef}
				/>
			</Box>
		</Box>
	);
};

export default Timetable;
