import React, {
	useState, useEffect, useRef, useCallback, forwardRef,
} from 'react';
import { Box } from '@mui/material';
import {formatRequestDate, generateReservationMeta, getTimetableDays, px} from 'utils/utils';
import { generateCars, generateReservations, ICar, IReservation} from 'data/dummy-timetable-data';
import Header from 'components/Timetable/components/Header';
import Category from 'components/Timetable/components/Category';
import ReservationWrapper from 'components/Timetable/components/ReservationWrapper';
import Cell from 'components/Timetable/components/Cell';
import CarCol from 'components/Timetable/components/CarCol';

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
		gridTemplateColumns: 'minmax(71px, auto) repeat(31, minmax(34px, auto))',
		overflow: 'visible',
		zIndex: 9,
	},
};

export interface IDay {
	date: Date,
	key: string,
	value: number,
	day: string,
}

const convertServerDate = (date: string) => {
	const s = date.split('-').map((item) => Number.parseInt(item, 10));
	return new Date(s[0], s[1] - 1, s[2]);
	// const serverOffset = moment().tz('Europe/Budapest').utcOffset();
	// const clientOffset = moment().utcOffset();
	// return new Date(date.getTime() + (clientOffset - serverOffset) * 60000);
};

export interface IHeaderProps {
	withHeaderDivider?: boolean;
	cornerText?: string,
	cornerStyle?: object,
	highlightWeekend?: boolean,
}

const defaultHeaderProps = {
	withHeaderDivider: true,
	cornerText: 'Gépjármű',
	cornerStyle: {},
	highlightWeekend: true,
};

interface Props {
	colWidth: number,
	firstColWidth: number,
	headerHeight: number,
	colHeight: number,
	itemPaddingY: number,
	TableItem: any,
	itemOffset: number,
	style?: object,
	anchorDate: Date,
	variant: 'week' | 'month' | 'mini',
	height: number,
	headerProps?: IHeaderProps,
}

const Timetable = forwardRef(({
	colWidth,
	firstColWidth,
	headerHeight,
	colHeight,
	itemPaddingY,
	TableItem,
	itemOffset,
	style = {},
	anchorDate,
	variant,
	height,
	headerProps = {},
}: Props, ref) => {
	const [days, setDays] = useState<IDay[]>([]);
	const [dataMap, setDataMap] = useState<any>({});
	const [cars, setCars] = useState<any[]>([]);
	const [occupationMap, setOccupationMap] = useState<any>({});
	const [reservations, setReservations] = useState<IReservation[]>([]);

	const gridStyle = {
		gridTemplateColumns: `${px(firstColWidth)} repeat(${days.length}, minmax(${px(colWidth)}, auto))`,
		minWidth: px(firstColWidth + colWidth * days.length),
	};

	const [currentColWidth, setCurrentColWidth] = useState(34);
	const colRef: any = useRef<HTMLDivElement>(null);

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
				const meta = generateReservationMeta(reservation, days[0].date, days[days.length - 1].date);
				if (meta) {
					reservation.cars.forEach((car) => {
						const arrival = convertServerDate(reservation.arrival);
						const departure = convertServerDate(reservation.departure);
						for (let i = arrival.getTime(); i < departure.getTime() && i <= days[days.length - 1].date.getTime(); i += (1000 * 60 * 60 * 24)) {
							if (!om[car.id]) {
								om[car.id] = {};
							}
							om[car.id][i.toString()] = true;
						}
						if (!tmp[car.id]) {
							tmp[car.id] = {};
						}
						const k = tmp[car.id][meta.key];
						if (!k) {
							tmp[car.id][meta.key] = [{ reservation, meta }];
						} else {
							tmp[car.id][meta.key].push({ reservation, meta });
						}
					});
				}
			});
			setDataMap(tmp);
			setOccupationMap(om);
		}
	}, [reservations, days]);

	useEffect(() => {
		setDays(getTimetableDays(anchorDate, variant));
	}, [anchorDate, variant]);

	useEffect(() => {
		const carSorter = (a: ICar, b: ICar) => {
			if (a.category.order && b.category.order) {
				if (a.category.order < b.category.order) {
					return -1;
				}
				if (a.category.order > b.category.order) {
					return 1;
				}
				return 0;
			}
			return 0;
		};
		let r = generateCars();
		r = r.sort(carSorter);
		const result = [];
		let lastCategoryId = null;
		for (let i = 0; i < r.length; i += 1) {
			if (r[i].category.id !== lastCategoryId) {
				lastCategoryId = r[i].category.id;
				result.push({ divider: r[i].category});
			}
			result.push(r[i]);
		}
		setCars(result);
	}, []);

	const fetchReservations = useCallback(() => {
		// const r = await dispatch(getReservations(new Date(days[0].date.getTime() - days.length * DAY), new Date(days[days.length - 1].date.getTime() + days.length * DAY), isUnified))();
		const k = generateReservations(new Date(), cars);
		setReservations(k);
	}, [cars]);

	useEffect(() => {
		fetchReservations();
	}, [fetchReservations]);

	const handleReservationClick = (e: any, reservationId: string) => {
		e.stopPropagation();
		console.log('Reservation clicked:', reservationId);
	};

	const handleDayClick = (day: IDay) => {
		console.log('Day clicked:', formatRequestDate(day.date));
	};

	return (
		<Box sx={{ ...sx.rootRoot, ...style }} ref={ref}>
			<Box sx={{ ...sx.root, maxHeight: px(height), minHeight: px(Math.min(colHeight * cars.length + headerHeight, 300)) }}>
				<Header
					days={days}
					height={headerHeight}
					gridStyle={gridStyle}
					colRef={colRef}
					headerProps={{ ...defaultHeaderProps, ...headerProps }}
				/>
				<Box sx={{ ...sx.grid, ...gridStyle }}>
					{cars.map((car, i) => {
						if (car.divider) {
							return <Category key={car.divider.id} category={car.divider} daysCount={days.length} />;
						}
						const isLastCar = i === cars.length - 1;
						return (
							<React.Fragment key={car.id}>
								<CarCol car={car} isLastCar={isLastCar} colHeight={colHeight} />
								{days.map((day) => {
									const items = dataMap?.[car.id]?.[day.key] ? dataMap[car.id][day.key] : null;
									const isOccupied = !!occupationMap?.[car.id]?.[day.key];
									return (
										<Cell
											key={day.key}
											isOccupied={isOccupied}
											isLastCar={i === cars.length - 1}
											isLastDay={i === days.length - 1}
											onClick={() => handleDayClick(day)}
											currentColWidth={currentColWidth}
											itemOffset={itemOffset}
											itemPaddingY={itemPaddingY}>
											{items && items.map((data: any) => {
												return (
													<ReservationWrapper
														key={data.reservation.id}
														data={data}
														currentColWidth={currentColWidth}
														itemOffset={itemOffset}
														itemPaddingY={itemPaddingY}
													>
														<TableItem
															data={data.reservation}
															withStart={data.meta.withStart}
															withEnd={data.meta.withEnd}
															onClick={(e: any) => handleReservationClick(e, data.reservation.id)}
															order={data.reservation.cars[0].category.order}
														/>
													</ReservationWrapper>
												);
											})}
										</Cell>
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

export default Timetable;
