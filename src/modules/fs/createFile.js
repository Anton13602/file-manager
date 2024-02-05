import { writeFile } from 'node:fs/promises';
import { cwd, } from 'node:process';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';

const createFile = async (fileName) => {
	try {
		const pathToFile = join(cwd(), fileName);
		await writeFile(pathToFile, '');
	} catch (err) {
		console.error(errorMessage);
	}
};

export default createFile;
