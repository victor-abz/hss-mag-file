const axios = require('axios').default;
const electron = require('electron').remote;
const dialog = electron.dialog;

const base_url = 'http://127.0.0.1:7777/';

const options = {
	headers: {
		'Content-Type': 'application/json',
	},
};

function handleMifotraFile() {
	let endpoint = base_url + 'validate-hssmag';

	dialog
		.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'Text', extensions: ['xlsx'] }],
		})
		.then((result) => {
			console.log(result.filePaths, result.canceled);
			if (result.filePaths.length > 0) {
				let req_data = {
					path: result.filePaths[0],
				};
				localStorage.setItem('hss_mag_file', req_data.path);
				axios
					.post(endpoint, req_data)
					.then(({ data }) => {
						if (data.success) {
							btnMifotra.classList.remove('btn-info');
							btnMifotra.classList.add('btn-success');
							iconMifotra.classList.remove('d-none');
							btnIDS.disabled = false;
						} else {
							btnMifotra.classList.remove('btn-info');
							btnMifotra.classList.add('btn-danger');
							errorMessage.innerHTML = data.msg;
							toggleModal.click();
						}
					})
					.catch((err) => {
						btnMifotra.classList.remove('btn-info');
						btnMifotra.classList.add('btn-danger');
						errorMessage.innerHTML = err;
						toggleModal.click();
					});
			}
		})
		.catch((err) => {
			errorMessage.innerHTML = err;
			toggleModal.click();
		});
}

function handleId() {
	let endpoint = base_url + 'validate-ids';

	dialog
		.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'Text', extensions: ['csv'] }],
		})
		.then((result) => {
			console.log(result.filePaths, result.canceled);
			if (result.filePaths.length > 0) {
				let req_data = {
					path: result.filePaths[0],
				};
				localStorage.setItem('adfinance_file', req_data.path);
				axios
					.post(endpoint, req_data)
					.then(({ data }) => {
						if (data.success) {
							btnIDS.classList.remove('btn-info');
							btnIDS.classList.add('btn-success');
							console.log('*******');
							iconIds.classList.remove('d-none');
							btnPath.disabled = false;
						} else {
							btnIDS.classList.remove('btn-info');
							btnIDS.classList.add('btn-danger');
							errorMessage.innerHTML = data.msg;
							toggleModal.click();
						}
					})
					.catch((err) => {
						btnIDS.classList.remove('btn-info');
						btnIDS.classList.add('btn-danger');
						errorMessage.innerHTML = err;
						toggleModal.click();
					});
			}
		})
		.catch((err) => {
			errorMessage.innerHTML = err;
			toggleModal.click();
		});
}

function handleDir() {
	let endpoint = base_url + 'validate-ids';

	dialog
		.showOpenDialog({
			properties: ['openDirectory'],
		})
		.then((result) => {
			console.log(result.filePaths, result.canceled);
			if (result.filePaths.length > 0) {
				localStorage.setItem('output_folder', result.filePaths[0]);
				btnPath.classList.remove('btn-info');
				btnPath.classList.add('btn-success');
				iconPath.classList.remove('d-none');
				submitBtn.disabled = false;
			}
		})
		.catch((err) => {
			errorMessage.innerHTML = err;
			toggleModal.click();
		});
}

function processData() {
	let endpoint = base_url + 'process';

	btnMifotra.disabled = true;
	btnIDS.disabled = true;
	btnPath.disabled = true;
	submitBtn.disabled = true;

	submitBtn.classList.add('d-none');
	loadingBtn.classList.remove('d-none');

	let req_data = {
		hss_mag_file: localStorage.getItem('hss_mag_file'),
		adfinance_file: localStorage.getItem('adfinance_file'),
		output_folder: localStorage.getItem('output_folder'),
	};
	axios
		.post(endpoint, req_data)
		.then(({ data }) => {
			if (data.success) {
				btnIDS.classList.remove('btn-info');
				btnIDS.classList.add('btn-success');
				iconIds.classList.remove('d-none');
				btnPath.disabled = true;

				submitBtn.classList.remove('d-none');
				submitBtn.disabled = true;
				loadingBtn.classList.add('d-none');
			} else {
				btnIDS.classList.remove('btn-info');
				btnIDS.classList.add('btn-danger');
				errorMessage.innerHTML = data.msg;
				toggleModal.click();
			}
		})
		.catch((err) => {
			btnIDS.classList.remove('btn-info');
			btnIDS.classList.add('btn-danger');
			errorMessage.innerHTML = err;
			toggleModal.click();
		});
}
