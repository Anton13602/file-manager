import { chdir, cwd } from 'node:process';
import { errorMessage } from '../../constants/constant.js';

const cd = (path) => {
	try {
		chdir(path);
	} catch (error) {
		console.error(errorMessage);
	}
};

export default cd;
