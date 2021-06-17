import React, { useState, useEffect, useContext, createContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({children}) => {
	const [events, setEvents] = useState([]);

	const [filteredEvents, setFilteredEvents] = useState([]);

	let dateFormat = (date) => {
		return date.setHours(0, 0, 0, 0);
	};
	
	const formInputs = {
		id: 1,
		date: dateFormat(new Date()),
		name: "",
		type: "1",
		address: "",
		time: "",
		budget: "",
		note: "",
	};

	const [fields, setFormData] = useState(formInputs);

	const { date } = fields;
	
	useEffect(() => {
		let newData = events.filter((event) => event.date === date);

		setFilteredEvents(newData);
	}, [events]);
	
	
	return (
		<DataContext.Provider value={{
			events, setEvents, filteredEvents, setFilteredEvents, formInputs, fields, setFormData
		}}>
			{children}
		</DataContext.Provider>
	)
}

export const useData = () => useContext(DataContext)