import React, { useState, useEffect, useContext, createContext } from 'react';

// Создаем контекст, через который прокидываются данные во все компоненты
const DataContext = createContext();

export const DataProvider = ({children}) => {
	// Проверяем есть ли сохраненные записи в LocalStorage
	let eventsCache = !!localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

	// Объявление переменной состояния событий. Пустой массив или из LocalStorage
	const [events, setEvents] = useState(eventsCache);

	// Объявление переменной состояния фильтрованных по дате событий
	const [filteredEvents, setFilteredEvents] = useState([]);

	// Приведение строки даты к числу без указания времени
	let dateFormat = (date) => {
		return date.setHours(0, 0, 0, 0);
	};
	
	// Исходное состояние для полей формы
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

	// Объявление переменной состояния полей формы
	const [fields, setFormData] = useState(formInputs);

	// Достаем дату из полей
	const { date } = fields;
	
	/* 
	При каждом изменении переменной событий создаем временную переменную 
	и присваиваем ей отфильтрованные по дате события.
	*/
	useEffect(() => {
		let newData = events.filter((event) => event.date === date);

		// Обновляем state фильтрованных событий
		setFilteredEvents(newData);

		// Обновляем записи в LocalStorage
		localStorage.setItem("events", JSON.stringify(events));
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