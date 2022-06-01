import {formatRequestDate, onlyDate} from 'utils/utils';
import { nanoid } from 'nanoid';
import fakeNames from 'data/fake-names.json';

export interface ICategory {
	id: string;
	name: string;
	order: number;
	prefix?: string;
	quantity?: number;
}

export interface ICar {
	id: string;
	name: string;
	category: ICategory;
}

export interface IReservation {
	id: string,
	arrival: string;
	departure: string;
	cars: ICar[];
	clientName: string;
}

interface IRandomRowItem {
	isReservation: boolean;
	length: number;
}

const CATEGORIES: ICategory[] = [
	{
		id: nanoid(),
		name: 'Tesla Model 3',
		order: 0,
		prefix: 'TSL',
		quantity: 2,
	},
	{
		id: nanoid(),
		name: 'Nissan Leaf',
		order: 1,
		prefix: 'NSN',
		quantity: 4,
	},
	{
		id: nanoid(),
		name: 'Dacia Spring',
		order: 2,
		prefix: 'DAC',
		quantity: 6,
	},
];

const getRandomRowItem = (): IRandomRowItem => {
	const isReservation = Math.random() < 0.3;
	const length = isReservation ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 3);
	return { isReservation, length };
};

const getRandomClientName = (): string => fakeNames[Math.floor(Math.random() * fakeNames.length)];


export const generateReservations = (anchorDate: Date, cars: ICar[], days = 120): IReservation[] => {
	const r: IReservation[] = [];
	const t = (d: Date): number => d.getTime();
	const k = Math.floor(days / 2);
	const firstDate = onlyDate(anchorDate, -k);
	const lastDate = onlyDate(anchorDate, k);
	cars.forEach((car) => {
		let i = firstDate;
		while (t(i) <= t(lastDate)) {
			const rand = getRandomRowItem();
			const nextDate = onlyDate(i, rand.length);
			if (rand.isReservation) {
				r.push({
					id: nanoid(),
					arrival: formatRequestDate(i),
					departure: formatRequestDate(nextDate),
					cars: [car],
					clientName: getRandomClientName(),
				});
			}
			i = nextDate;
		}
	});
	return r;
};

export const generateCars = (): ICar[] => {
	const r: ICar[] = [];
	CATEGORIES.forEach((cat) => {
		if (cat.quantity) {
			for (let i = 0; i < cat.quantity; i += 1) {
				r.push({
					id: nanoid(),
					name: `${cat.prefix}${i + 1}`,
					category: { id: cat.id, name: cat.name, order: cat.order },
				});
			}
		}
	});
	return r;
};
