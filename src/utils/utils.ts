import {IReservation} from 'data/dummy-timetable-data';
import {IDay} from 'components/Timetable/Timetable';

const locale = 'hu-HU';

export const px = (s: number | string) => `${s}px`;
export const wz = (k: number): string => `${k < 10 ? 0 : ''}${k}`;

export const getMonthName = (date: Date, short = false) => date.toLocaleString(locale, { month: short ? 'short' : 'long' });

export const displayMonth = (d = new Date()) => `${d.getFullYear()}. ${getMonthName(d)}`;

export const onlyDate = (d: Date, addition = 0): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate() + addition);

export const formatRequestDate = (date: Date): string => `${date.getFullYear()}-${wz(date.getMonth() + 1)}-${wz(date.getDate())}`;

const convertServerDate = (date: string) => {
	const s = date.split('-').map((item) => Number.parseInt(item, 10));
	return new Date(s[0], s[1] - 1, s[2]);
	// const serverOffset = moment().tz('Europe/Budapest').utcOffset();
	// const clientOffset = moment().utcOffset();
	// return new Date(date.getTime() + (clientOffset - serverOffset) * 60000);
};

export const generateReservationMeta = (reservation: IReservation, firstDate: Date, lastDate: Date) => {
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
		key = t(firstDate).toString();
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

const DAY_NAMES = ['H', 'K', 'SZE', 'CS', 'P', 'SZO', 'V'];
const normalizeDay = (d: number): number => (d ? d - 1 : 6);
export const getTimetableDays = (date: Date, variant: string): IDay[] => {
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
