import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'node:process';
import { join } from 'path';
import { pipeline } from 'node:stream/promises';

import { errorMessage } from '../../constants/constant.js';

const copy = async (file, newFile) => {
	try {
		const currentDir = cwd();
		const pathFile = join(currentDir, file);
		const pathToNewFile = join(currentDir, newFile);

		await pipeline(
			createReadStream(pathFile, { encoding: 'utf-8' }),
			createWriteStream(pathToNewFile),
		);
	} catch (error) {
		console.error(errorMessage);
	}
};

export default copy;
