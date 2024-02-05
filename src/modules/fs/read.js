import { createReadStream } from 'fs';
import { cwd, stdout } from 'node:process';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';

const read = async (file) => {
	try {
		return new Promise((resolve, reject) => {
			const path = join(cwd(), file);
			const readStream = createReadStream(path);
			readStream
				.on('error', (error) => reject(error))
				.on('data', (data) => {
					stdout.write(data);
				}).on('close', () => resolve());
		});
	} catch (error) {
		console.error(errorMessage);
	}
};

const readFile = async (file) => {
	try {
		await read(file)
	} catch (error) {
		console.error(errorMessage);
	}
}

export default readFile;
