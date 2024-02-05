import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { cwd } from 'node:process';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';

const calculateHash = async (file) => {
	const hash = createHash('sha256');
	const pathToFile = join(cwd(), file);
	const readStream = createReadStream(pathToFile);

	readStream
		.on('error', () => console.error(errorMessage))
		.on('data', (chunk) => hash.update(chunk))
		.on('end', () => {
			console.log(hash.digest('hex'));
		});
};

export default calculateHash;
