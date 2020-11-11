'use strict';

export const signIn = (event) => {
	const username = document.getElementById('user1').value;
	const password = document.getElementById('pass1').value;
	const login_page = document.getElementById('login-wrap');
	const chat_forum = document.getElementById('root');
	const avatar_list = document.getElementById('users-list');

	// throw error for empty input
	if (isEmpty(username, password)) {
		return;
	}

	getUserInfo().then((data) => {
		console.log(data);
		// check user in database
		const activeUser = isUserExistInData(data.users, username, password);
		console.log('active user', activeUser);
		// if user not exist in the database
		if (!activeUser) {
			alert(`${username.toUpperCase()}, Please sign-up, you have not any account yet`);
		} else {
			// render chat-forum
			login_page.style.display = 'none';
			chat_forum.style.display = 'block';

			if (renderAvatars(data.users)) {
				const div = document.createElement('div');
				div.innerHTML = renderAvatars(data.users);
				avatar_list.appendChild(div);
			}
		}
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

// check user name and password
function isUserExistInData(data, name, password) {
	return data.find((userName) => {
		return userName.name === name && userName.password === password;
	});
}

// generate users avatar

function renderAvatars(data) {
	let userLists = '';
	if (data) {
		data.forEach((element) => {
			userLists += `<li>
			<img src="/img/${element.avatar}" id='${element.name}' alt="">
			<div>
			  <h2 >${element.name}</h2>
			</div>
			</li>`;
		});
		return userLists;
	}
}
