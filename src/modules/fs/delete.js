import { unlink } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';

const remove = async (file) => {
	try {
		const pathToFile = join(cwd(), file);
		await unlink(pathToFile);
	} catch (error) {
		console.error(errorMessage);
	}
};

export default remove;
