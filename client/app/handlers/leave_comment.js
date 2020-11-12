'use strict';

export const leaveComment = (event) => {
	const myComment = document.getElementById('myComment').value;

	// check empty comments
	if (isEmpty(myComment)) {
		alert('Please write something before submit');
		return;
	}
};

// check user empty comment

function isEmpty(comment) {
	if (!Boolean(comment.trim())) {
		return true;
	}
}
