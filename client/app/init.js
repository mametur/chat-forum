import { register } from './handlers/register.js';
import { setimage } from './handlers/register.js';
import { signIn } from './handlers/signIn.js';

document.getElementById('my-select').addEventListener('onchange', setimage);
document.getElementById('signup').addEventListener('click', register);

/*Sign-in Handler*/

document.getElementById('sign-in-button').addEventListener('click', signIn);
