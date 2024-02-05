import { unlink } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';
import copy from './copy.js';

const move = async (file, newFile) => {
	try {
		const path = join(cwd(), file)
		await copy(file, newFile);
		await unlink(path);
	} catch (error) {
		console.error(errorMessage);
	}
};

export default move;
