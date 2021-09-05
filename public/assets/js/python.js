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
	//   let path_to_open = inputPath.value
	let endpoint = base_url + 'open-explorer';
	// let endpoint = base_url + 'hello/' + 'Victor';

	dialog
		.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'Text', extensions: ['xls', 'xlsx', 'csv'] }],
		})
		.then((result) => {
			console.log(result.filePaths, result.canceled);
			// console.log(result.filePaths);
			dataResult.innerHTML = JSON.stringify(result.filePaths[0], null, 4);
			if (result.filePaths.length > 0) {
				let req_data = {
					path: result.filePaths[0],
				};
				axios
					.post(endpoint, req_data)
					.then((res) => {
						// dataResult.innerHTML = res['data'];
						console.log(res.data);
						btnMifotra.classList.remove('btn-info');
						btnMifotra.classList.add('btn-success');
						iconMifotra.classList.remove('d-none');
						btnIDS.disabled = false;
						apiResult.innerHTML = JSON.stringify(res.data, null, 4);
					})
					.catch((err) => {
						console.log({ err });
						btnMifotra.classList.remove('btn-info');
						btnMifotra.classList.add('btn-danger');
						apiResult.innerHTML = JSON.stringify(err, null, 4);
					});
			}
		})
		.catch((err) => {
			// console.log(err);
			dataResult.innerHTML = JSON.stringify(err, null, 4);
		});
	// console.log();
	//   let req_data = {
	//     path: path_to_open
	//   }
}
