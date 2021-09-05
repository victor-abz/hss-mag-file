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
				localStorage.setItem('hss_mag', req_data.path);
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
						errorMessage.innerHTML =
							'An Error Occurred please contact Admin';
						toggleModal.click();
					});
			}
		})
		.catch((err) => {
			errorMessage.innerHTML = err;
			toggleModal.click();
		});
}
