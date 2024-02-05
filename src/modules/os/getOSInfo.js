import { EOL, cpus, homedir, arch, userInfo } from 'os';

import { errorMessage } from '../../constants/constant.js';

const getOSInfo = (props) => {
	const info = {
		'--EOL': () => JSON.stringify(EOL),
		'--username': () => userInfo().username,
		'--homedir': homedir,
		'--architecture': arch,
		'--cpus': () => {
			return cpus()
				.map(cpu => {
					return {
						model: cpu.model,
						speed: `${cpu.speed}GHz`,
					};
				});
		},
	};

	if (!info[props]) {
		console.error(errorMessage);
		return;
	}

	if (props === '--cpus') {
		console.table(info[props]());
		return;
	}

	console.log(info[props]());
};

export default getOSInfo;
