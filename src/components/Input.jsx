import React, { useState, useEffect } from 'react';

import ShowTodo from './ShowTodo';

const Input = () => {
	// helper function for getting the todos from local storage
	const getDataFromLocalStorage = () => {
		const data = localStorage.getItem('todos');
		if (data) {
			return JSON.parse(data);
		} else {
			return [];
		}
	};

	// State - (Pass this state to ShowTodos as props for mapping)
	// Set as empty string by default
	const [todo, setTodo] = useState('');
	// Set as empty array by default (State to hold all Todos - Will eventually be localStorage)
	const [todos, setTodos] = useState(getDataFromLocalStorage);

	// Helper function to update todo state
	const handleChange = (e) => {
		setTodo(e.target.value);
	};

	// Set a helper function to handle submit
	// - - OnSubmit be sure to revert todo back to empty string
	const handleSubmit = (e) => {
		e.preventDefault();
		setTodos((todos) => [...todos, todo]);
		// localStorage.setItem('todos', JSON.stringify(todos));
		// let storedTodos = JSON.parse(localStorage.getItem('todos'));
		// setTodos(storedTodos);
	};

	// Helper function to deleteTodo => Pass down as props
	const handleDeleteTodo = (id) => {
		setTodos(todos.filter((todo, idx) => idx !== id));
	};

	// Apply useEffect to update the component once todoS state is updated
	// - - NOTE: useEffect will run on initial load as well
	// - - Use useEffect cleanup to reset todo state so input val can be "" again
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));

		return () => {
			setTodo('');
		};
	}, [todos]);

	return (
		<div className="container-fluid pt-5">
			<div className="mb-5">
				<h1>Todo List</h1>
			</div>
			<form className="input-group mb-3 px-5">
				<input
					type="text"
					className="form-control"
					placeholder="Add Todo"
					aria-label="Add Todo"
					aria-describedby="basic-addon1"
					name="todo"
					type="text"
					value={todo}
					onChange={handleChange}
				/>
				<button
					onClick={handleSubmit}
					className="btn btn-primary"
					title="Add Todo"
				>
					+
				</button>
			</form>
			<ShowTodo todos={todos} handleDeleteTodo={handleDeleteTodo} />
		</div>
	);
};

export default Input;
