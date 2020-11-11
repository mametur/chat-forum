'use strict';

export const signIn = (event) => {
	const username = document.getElementById('user1').value;
	const password = document.getElementById('pass1').value;

	// throw error for empty input
	if (isEmpty(username, password)) {
		return;
	}

	getUserInfo().then((data) => {
		console.log(data);
	});
};
//Fetch get Method
async function getUserInfo() {
	try {
		const response = await fetch('/api/users');
		//if something wrong
		if (!response.ok) {
			const message = `An error has accured: ${response.status}`;
			throw new error(message);
		}
		const usersInfo = await response.json();

		return usersInfo;
	} catch (error) {
		error.message;
	}
}
// check user info is not empty

function isEmpty(name, password) {
	if (!Boolean(name.trim()) || !Boolean(password.trim())) {
		alert('Please pass your info');
		return true;
	}
}
