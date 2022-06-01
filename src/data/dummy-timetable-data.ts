const timetableData = {
	rooms: [
		{
			id: '1',
			name: 'Room 1',
		},
		{
			id: '2',
			name: 'Room 2',
		},
	],
	reservations: [
		{
			id: 37,
			clientName: 'Guest 1',
			arrival: '2022-05-31',
			departure: '2022-06-04',
			rooms: [
				{
					id: '1',
					name: 'Room 1',
				},
			],
		},
	],
};

export default timetableData;
