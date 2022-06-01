import React, {
	useState, useEffect, useRef, useCallback, forwardRef,
} from 'react';
import { Box, Typography } from '@mui/material';
import palette from 'theme/palette';
import { useRouter } from 'next/router';
import { px } from 'utils/utils';
import timetableData from 'data/dummy-timetable-data';

const contentHover = {
	cursor: 'pointer',
	'& .hover-indicator': {
		display: 'block',
	},
};

const sx: any = {
	rootRoot: {
		overflow: 'hidden',
		borderRadius: '16px',
		mt: '40px',
		WebkitBackfaceVisibility: 'hidden',
		MozBackfaceVisibility: 'hidden',
		WebkitTransform: 'translate3d(0, 0, 0)',
		MozTransform: 'translate3d(0, 0, 0)',
		boxShadow: '0px 4px 18px rgba(96, 81, 188, 0.2)',
	},
	root: {
		overflow: 'visible scroll',
	},
	grid: {
		display: 'grid',
		// minWidth: '1125px',
		gridTemplateColumns: 'minmax(71px, auto) repeat(31, minmax(34px, auto))',
		overflow: 'visible',
		zIndex: 9,
	},
	daysContainer: {
		display: 'grid',
		// minWidth: '1125px', // sum of minwidths
		gridTemplateColumns: 'minmax(71px, auto) repeat(31, minmax(34px, auto))',
		height: '30px',
		overflow: 'visible',
		// overflowX: 'visible',
		zIndex: 10000,
		// position: 'relative',
		position: 'sticky',
		top: 0,
		boxShadow: '0px 0px 30px rgba(96, 81, 188, 0.3)',
		// borderRadius: '10px',
	},
	dayItem: {
		backgroundColor: 'coral',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid aqua',
	},
	roomHeader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'sticky',
		left: 0,
		backgroundColor: 'text.primaryDarkest',
	},
	roomHeaderText: {
		fontSize: '10px',
		color: 'white',
		fontWeight: 600,
		textTransform: 'uppercase',
		letterSpacing: '-0.8px',
		userSelect: 'none',
	},
	headerItemRoot: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerItemContent: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerDivider: {
		width: '1px',
		height: '32px',
		backgroundColor: 'text.primaryMid',
	},
	headerDateContainer: {
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
	headerDate: {
		fontWeight: 700,
		color: 'inherit',
		userSelect: 'none',
	},
	headerDay: {
		fontSize: '10px',
		lineHeight: '14px',
		mt: '1px',
		color: 'text.primaryMid',
		userSelect: 'none',
	},
	roomText: {
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
	firstCol: {
		position: 'sticky',
		backgroundColor: 'text.primaryLightest',
		left: 0,
		zIndex: 1000,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		px: '4px',
	},
	item: {
		position: 'relative',
		backgroundColor: 'transparent',
		pointerEvents: 'none',
	},
	itemContent: {
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
	hoverIndicatorContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		pointerEvents: 'none',
		display: 'none',
	},
	hoverIndicator: {
		height: '100%',
		backgroundColor: '#E4E1F4',
		borderTopLeftRadius: '14px',
		borderBottomLeftRadius: '14px',
	},
	tableItemContainer: {
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 900,
	},
	hotelDividerTextContainer: {
		height: '22px',
		position: 'fixed',
		left: '20px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	hotelDividerText: {
		color: 'white',
		textTransform: 'uppercase',
		fontSize: '10px',
	},
};

const normalizeDay = (d: number): number => (d ? d - 1 : 6);

interface IDay {
	date: Date,
	key: string,
	value: number,
	day: string,
}

const getDays = (date: Date, variant: string): IDay[] => {
	const convertOutput = (d: Date) => ({
		date: d,
		key: d.getTime().toString(),
		value: d.getDate(),
		day: DAY_NAMES[normalizeDay(d.getDay())],
	});
	let r = [];
	if (variant === 'week') {
		const y = date.getFullYear();
		const m = date.getMonth();
		const d = date.getDate();
		const day = normalizeDay(date.getDay());
		for (let i = d - day; i <= d + 6 - day; i += 1) {
			r.push(convertOutput(new Date(y, m, i)));
		}
	}
	if (variant === 'month') {
		const y = date.getFullYear();
		const m = date.getMonth();
		const ld = (new Date(y, m + 1, 0)).getDate();
		for (let i = ld; i >= 1; i -= 1) {
			r.push(convertOutput(new Date(y, m, i)));
		}
		r = r.reverse();
	}
	if (variant === 'mini') {
		const y = date.getFullYear();
		const m = date.getMonth();
		const d = date.getDate();
		for (let i = d; i <= d + 6; i += 1) {
			r.push(convertOutput(new Date(y, m, i)));
		}
	}
	return r;
};

const DAY_NAMES = ['H', 'K', 'SZE', 'CS', 'P', 'SZO', 'V'];

const getToday = () => {
	const d = new Date();
	return (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime().toString();
};

const convertServerDate = (date: string) => {
	const s = date.split('-').map((item) => Number.parseInt(item, 10));
	return new Date(s[0], s[1] - 1, s[2]);
	// const serverOffset = moment().tz('Europe/Budapest').utcOffset();
	// const clientOffset = moment().utcOffset();
	// return new Date(date.getTime() + (clientOffset - serverOffset) * 60000);
};

const getReservationMeta = (reservation: Reservation, firstDate: Date, lastDate: Date) => {
	const t = (d: Date) => d.getTime();
	const dayDiff = (d1: Date, d2: Date) => (t(d1) - t(d2)) / 86400000;
	const arrival = convertServerDate(reservation.arrival);
	const departure = convertServerDate(reservation.departure);
	let withStart = true;
	let withEnd = true;
	let length;
	let key;

	if (t(arrival) > t(lastDate) || t(departure) < t(firstDate)) {
		return null;
	}

	if (t(arrival) < t(firstDate)) {
		withStart = false;
		key = firstDate.getTime().toString();
		if (t(departure) > t(lastDate)) {
			withEnd = false;
			length = dayDiff(lastDate, firstDate);
		} else {
			length = dayDiff(departure, firstDate);
		}
	} else {
		key = t(arrival).toString();
		if (t(departure) > t(lastDate)) {
			withEnd = false;
			length = dayDiff(lastDate, arrival);
		} else {
			length = dayDiff(departure, arrival);
		}
	}
	return {
		key, length, withStart, withEnd,
	};
};

interface Room {
	id: string,
	name: string,
}

interface Reservation {
	arrival: string,
	departure: string,
	rooms: Room[],
}

const Timetable = forwardRef(({
	colWidth,
	firstColWidth,
	headerHeight,
	colHeight,
	itemPaddingY,
	TableItem,
	itemOffset,
	style,
	withHeaderDivider,
	cornerText,
	cornerStyle,
	anchorDate,
	variant,
	highlightWeekend,
	height,
	withHotelDivider,
}: Props, ref) => {
	const [days, setDays] = useState<IDay[]>(getDays(anchorDate, variant));
	const [rooms, setRooms] = useState<any[]>([]);
	const [dataMap, setDataMap] = useState<any>({});
	const [occupationMap, setOccuationMap] = useState<any>({});
	const [reservations, setReservations] = useState<Reservation[]>([]);
	// const updateNeeded = useSelector((state) => state.ui.updates.calendar.reservations);

	const gridStyle = {
		gridTemplateColumns: `${px(firstColWidth)} repeat(${days.length}, minmax(${px(colWidth)}, auto))`,
		minWidth: px(firstColWidth + colWidth * days.length),
	};

	// const dispatch = useDispatch();
	const router = useRouter();

	const today = getToday();

	const [currentColWidth, setCurrentColWidth] = useState(34);
	const colRef: any = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			if (colRef?.current) {
				setCurrentColWidth(colRef.current.getBoundingClientRect().width);
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [days]);

	useEffect(() => {
		const tmp: any = {};
		const om: any = {};
		if (reservations.length) {
			reservations.forEach((reservation) => {
				const meta = getReservationMeta(reservation, days[0].date, days[days.length - 1].date);
				if (meta) {
					reservation.rooms.forEach((room) => {
						const arrival = convertServerDate(reservation.arrival);
						const departure = convertServerDate(reservation.departure);
						for (let i = arrival.getTime(); i < departure.getTime() && i <= days[days.length - 1].date.getTime(); i += (1000 * 60 * 60 * 24)) {
							if (!om[room.id]) {
								om[room.id] = {};
							}
							om[room.id][i.toString()] = true;
						}
						if (!tmp[room.id]) {
							tmp[room.id] = {};
						}
						// if (tmp[room.id][me])
						const k = tmp[room.id][meta.key];
						if (!k) {
							tmp[room.id][meta.key] = [{ reservation, meta }];
						} else {
							tmp[room.id][meta.key].push({ reservation, meta });
						}
					});
				}
			});
			setDataMap(tmp);
			setOccuationMap(om);
		}
	}, [reservations, days]);

	useEffect(() => {
		setDays(getDays(anchorDate, variant));
	}, [anchorDate, variant]);

	useEffect(() => {
		(async () => {
			try {
				// Rooms fetch here
				// let r = await dispatch(getRooms(isUnified))();
				const r = timetableData.rooms;
				setRooms(r);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [withHotelDivider]);

	const fetchReservations = useCallback(() => {
		if (days.length) {
			(async () => {
				try {
					// Reservations fetch here
					// const r = await dispatch(getReservations(new Date(days[0].date.getTime() - days.length * DAY), new Date(days[days.length - 1].date.getTime() + days.length * DAY), isUnified))();
					const r = timetableData.reservations;
					setReservations(r);
					// setReservations(r.items);
					// dispatch(setUpdates((draft) => {
					// 	draft.calendar.reservations = false;
					// }));
				} catch (error) {
					console.log(error);
				}
			})();
		}
	}, [days]);

	// useEffect(() => {
	// 	if (updateNeeded) {
	// 		fetchReservations();
	// 	}
	// }, [fetchReservations, updateNeeded]);

	useEffect(() => {
		fetchReservations();
	}, [fetchReservations]);

	return (
		<Box sx={{ ...sx.rootRoot, ...style }} ref={ref}>
			<Box sx={{ ...sx.root, maxHeight: px(height), minHeight: px(Math.min(colHeight * rooms.length + headerHeight, 300)) }}>
				<Box sx={{ ...sx.daysContainer, height: px(headerHeight), ...gridStyle }}>
					<Box sx={{ ...sx.roomHeader, ...cornerStyle }}>
						<Typography sx={sx.roomHeaderText}>{cornerText}</Typography>
					</Box>
					{days.map(({
						date: d, key, value, day,
					}, i) => {
						const rootStyle = { height: px(headerHeight), backgroundColor: highlightWeekend && normalizeDay(d.getDay()) > 4 ? 'text.primaryLightest' : '#FFF' };
						return (
							// <Box key={id}>{value}</
							<Box ref={!i ? colRef : null} key={key} sx={{ ...sx.headerItemRoot, ...rootStyle }}>
								<Box sx={{ ...sx.headerItemContent }}>
									<Box sx={{ ...sx.headerDateContainer, ...(key === today ? sx.todayDateContainer : {}) }}>
										<Typography sx={sx.headerDate}>{value}</Typography>
									</Box>
									<Typography sx={sx.headerDay}>{day}</Typography>
								</Box>
								{withHeaderDivider && i < days.length - 1 && <Box sx={sx.headerDivider} />}
							</Box>
						);
					})}
				</Box>
				<Box sx={{ ...sx.grid, ...gridStyle }}>
					{rooms.map((room, i) => {
						const { id, name } = room;
						if (room.divider) {
							return null;
						}
						const firstColStyle = i < rooms.length - 1 ? { borderBottom: `1px solid ${palette.text.primaryMid}` } : {};
						return (
							<React.Fragment key={id}>
								<Box sx={{
									...sx.firstCol, ...firstColStyle, height: px(colHeight),
								}}
								>
									<Typography sx={sx.roomText}>{name}</Typography>
								</Box>
								{days.map((day, j) => {
									const items = dataMap?.[id]?.[day.key] ? dataMap[id][day.key] : null;
									const isOccupated = !!occupationMap?.[id]?.[day.key];
									const calculateWidth = (idx: string) => {
										if (items) {
											const { length, withStart, withEnd } = items[idx].meta;
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
										}
										return 0;
									};

									const handleClick = (e: any, reservationId: string) => {
										e.stopPropagation();
										router.push(`/reservations/${reservationId}?origin=${encodeURIComponent(router.pathname)}`);
									};

									const getStyle = (isLastDay = false) => {
										let s: object = sx.itemContent;
										s = {
											...s,
											'&:hover': {
												...contentHover,
												cursor: isOccupated ? 'auto' : 'pointer',
											},
										};
										if (!isLastDay) {
											s = { ...s, borderRight: `1px dashed ${palette.text.primaryMid}` };
										}
										if (i < rooms.length - 1) {
											s = { ...s, borderBottom: `1px solid ${palette.text.primaryMid}` };
										}
										return s;
									};

									const handleDayClick = () => {
										// if (!isOccupated) {
										// 	dispatch(setNewReservationModal(true, { firstDate: date }, null, hotelId));
										// }
									};

									return (
										<Box sx={{ ...sx.item }} key={day.key}>
											<Box sx={getStyle(j === days.length - 1)} onClick={handleDayClick}>
												<Box className='hover-indicator' sx={{ ...sx.hoverIndicatorContainer, py: px(itemPaddingY) }}>
													<Box sx={{ ...sx.hoverIndicator, width: px(itemOffset), ml: px(currentColWidth - itemOffset) }} />
												</Box>
											</Box>
											{items && items.map((data: any, k: string) => (
												<Box
													key={data.reservation.id}
													sx={{
														...sx.tableItemContainer,
														width: px(calculateWidth(k)),
														ml: px(data.meta.withStart ? currentColWidth - itemOffset : 0),
														py: px(itemPaddingY),
													}}
												>
													<TableItem
														data={data.reservation}
														withStart={data.meta.withStart}
														withEnd={data.meta.withEnd}
														onClick={(e: any) => handleClick(e, data.reservation.id)}
													/>
												</Box>
											))}
										</Box>
									);
								})}
							</React.Fragment>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
});

Timetable.displayName = 'Timetable';

interface Props {
	colWidth: number,
	firstColWidth: number,
	headerHeight: number,
	colHeight: number,
	itemPaddingY: number,
	TableItem: any,
	itemOffset: number,
	style?: object,
	withHeaderDivider?: boolean,
	cornerText?: string,
	cornerStyle?: object,
	anchorDate: Date,
	variant: 'week' | 'month' | 'mini',
	highlightWeekend?: boolean,
	height: number,
	withHotelDivider?: boolean,
}

// Timetable.propTypes = {
// 	colWidth: PropTypes.number.isRequired,
// 	firstColWidth: PropTypes.number.isRequired,
// 	headerHeight: PropTypes.number.isRequired,
// 	colHeight: PropTypes.number.isRequired,
// 	itemPaddingY: PropTypes.number.isRequired,
// 	TableItem: PropTypes.any.isRequired,
// 	itemOffset: PropTypes.number.isRequired,
// 	style: PropTypes.object,
// 	withHeaderDivider: PropTypes.bool,
// 	cornerText: PropTypes.string,
// 	cornerStyle: PropTypes.object,
// 	anchorDate: PropTypes.object.isRequired,
// 	variant: PropTypes.oneOf(['week', 'month', 'mini']).isRequired,
// 	highlightWeekend: PropTypes.bool,
// 	height: PropTypes.number.isRequired,
// 	withHotelDivider: PropTypes.bool,
// };

Timetable.defaultProps = {
	style: {},
	withHeaderDivider: true,
	cornerText: 'Lakóegység',
	cornerStyle: {},
	highlightWeekend: true,
	withHotelDivider: false,
};

export default Timetable;
