import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

import { getPath } from '../utils/getPath.js';

const compress = async () => {
	// Write your code here
	const pathToFile = getPath(import.meta, ['files', 'fileToCompress.txt']);
	const pathToZip = getPath(import.meta, ['files', 'archive.gz']);

	const gzip = createGzip();
	const readStream = createReadStream(pathToFile);
	const writeStream = createWriteStream(pathToZip);

	readStream
		.pipe(gzip)
		.pipe(writeStream)
};

await compress();
