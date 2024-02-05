import { EOL } from 'os';
import { stdout } from 'node:process';

const writeEOL = () =>
	stdout.write(
		`Default system End-Of-Line: ${JSON.stringify(EOL)}${EOL}${EOL}`
	);

export default writeEOL;