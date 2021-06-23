import React, { useEffect, useState } from "react";
import { IUser } from "./interfaces";
import axios from "axios";
import "./App.css";

function App() {
	const [users, setUsers] = useState<IUser[]>([]);

	const [updateDetails, setUpdateDetails] = useState<IUser>({
		id: "",
		name: "",
		company: "",
		role: "",
	});

	const [deleteUserId, setDeleteUserId] = useState("");

	function changeUpdateDetails(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setUpdateDetails({
			...updateDetails,
			[e.target.name]: e.target.value,
		});
	}

	function submitUpdate(e: React.FormEvent) {
		e.preventDefault();
		axios
			.put("http://localhost:3000/users/update", updateDetails)
			.then((response) => {
				setUsers(response.data.users);
			})
			.catch((err) => {
				const data = err.response && err.response.data;
				if (data && data.message) alert(data.message);
				else alert(err.message);
			});
	}

	function submitDelete(e: React.FormEvent) {
		e.preventDefault();
		axios
			.delete(`http://localhost:3000/users/delete?id=${deleteUserId}`)
			.then((res) => {
				setUsers(res.data.users);
			})
			.catch((err) => {
				const data = err.response && err.response.data;
				if (data && data.message) alert(data.message);
				else alert(err.message);
			});
	}

	useEffect(() => {
		axios
			.get("http://localhost:3000/users/")
			.then((res) => {
				setUsers(res.data.users);
			})
			.catch((err) => {
				const data = err.response && err.response.data;
				if (data && data.message) alert(data.message);
				else alert(err.message);
			});
	}, []);

	return (
		<div className="App">
			<div>
				<h3>Users:</h3>
				{users.map((user) => {
					return (
						<div className="user-card">
							<p>User Id: {user.id}</p>
							<p>User Name: {user.name}</p>
							<p>User Company: {user.company}</p>
							<p>User Role: {user.role}</p>
						</div>
					);
				})}
			</div>
			<div>
				<h3>Update Users:</h3>
				<form onSubmit={submitUpdate}>
					<input
						placeholder="Enter User Id"
						name="id"
						onChange={changeUpdateDetails}
						value={updateDetails.id}
						required
					/>
					<input
						placeholder="Enter New User Name"
						name="name"
						onChange={changeUpdateDetails}
						value={updateDetails.name}
					/>
					<input
						placeholder="Enter New User Company"
						name="company"
						onChange={changeUpdateDetails}
						value={updateDetails.company}
					/>
					<input
						placeholder="Enter New User Role"
						name="role"
						onChange={changeUpdateDetails}
						value={updateDetails.role}
					/>
					<button type="submit">Submit</button>
				</form>
				<form onSubmit={submitDelete}>
					<h3>Delete User</h3>
					<input
						placeholder="Enter User Id"
						value={deleteUserId}
						onChange={(e) => {
							setDeleteUserId(e.target.value);
						}}
						required
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default App;
