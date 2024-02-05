import { createReadStream } from 'fs';
import { createHash } from 'crypto'

import { getPath } from '../utils/getPath.js';

const calculateHash = async () => {
	const hash = createHash('sha256');
	const pathToFile = getPath(import.meta, ['files', 'fileToCalculateHashFor.txt'])
	const readStream = createReadStream(pathToFile);

	readStream
		.on('data', (chunk) => {
		hash.update(chunk)
	})
		.on('end', () => {
			console.log('eng', hash.digest('hex'));
		})
};

await calculateHash();