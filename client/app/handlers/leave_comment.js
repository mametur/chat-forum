'use strict';
import { IamOnline } from './signIn.js';

export const leaveComment = (event) => {
	const myComment = document.getElementById('myComment').value;
	const chat_box = document.getElementById('chat');

	// check empty comments
	if (isEmpty(myComment)) {
		alert('Please write something before submit');
		return;
	}

	//Send user comment to data base
	const today = new Date();
	const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	const dateTime = date + ' ' + time;
	let my_comment = {
		name: IamOnline.name,
		comment: myComment,
		date: dateTime,
	};

	leaveNewComment(my_comment).then((data) => {
		// render comments
		if (renderComments(my_comment)) {
			const divChat = document.createElement('div');
			divChat.innerHTML = renderComments(my_comment);
			chat_box.lastElementChild.lastElementChild.appendChild(divChat);
		}
	});
};

// check user empty comment

function isEmpty(comment) {
	if (!Boolean(comment.trim())) {
		return true;
	}
}
// Post Method
async function leaveNewComment(comment) {
	try {
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		});
	} catch (error) {
		error.message;
	}
}

// generate comments

function renderComments(data) {
	let comments = `<li class="'me'">
        <div class="entete">
          <span class="status green"></span>
          <h2  class="text-danger">${data.name}</h2>
          <h3 >${data.date}</h3>
        </div>
        <div class="triangle"></div>
        <div class="message" id="user1comment">
       ${data.comment}
        </div>
      </li>`;

	return comments;
}