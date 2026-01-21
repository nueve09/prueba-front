/**
 * Función clousure para manejar el paginado y visualización de los datos de la tabla de remesas
 * @param {*} table tabla de remesas
 * @param {*} previousButton botón que controla el paginado hacia atrás
 * @param {*} nextButton botón que controla el paginado hacia delante
 */
export function createTable(table, previousButton, nextButton) {
	let start = 0;
	let end = start + ROWS_PER_PAGE;
	//let currentPage = 1;

	const mockLength = mockData.length;
	//const totalPages = Math.floor(mockData.length / ROWS_PER_PAGE) + (mockData.length % ROWS_PER_PAGE === 0 ? 0 : 1);

	/** Actualiza los estilos de los botones del paginado para mostrarlos habilitados o deshabilitados */
	const updateButtonsState = () => {
		previousButton.disabled = start === 0;
		nextButton.disabled = end >= mockLength;
	};

	const setStart = (index) => {
		start = index;
		end = start + ROWS_PER_PAGE;
		//currentPage += 1; 

		/** Actualiza y filtra la tabla */
		const filteredData = [...mockData].sort((a, b) => {
			const aCharged = a.status === TRASFER_STATUS.CHARGED;
			const bCharged = b.status === TRASFER_STATUS.CHARGED;

			if (aCharged && !bCharged) return -1;
			if (!aCharged && bCharged) return 1;

			return b.charged_at.localeCompare(a.charged_at);
		});

		/** Inserta las filas a la tabla */
		table.innerHTML = renderTableRows(filteredData, start, end);

		/** Agrega evento click para ver datos de la remesa */
		document.querySelectorAll('.transfer-item').forEach(row => {
			row.addEventListener('click', () => {
				const cells = row.querySelectorAll('td');
				const rowData = Array.from(cells).map(td => td.textContent);

				const idTransfer = rowData[0].replace("#", "");
				const transfer = filteredData.find((data) => data.id === idTransfer);
				// showModal(`${rowData.join(' | ')}`)
				showModal(
					"Datos de la remesa",
					transfer ?
					`<p>ID: <b>#${transfer.id} </b></p>
					<p>Estado: <b>${transfer.status === TRASFER_STATUS.CHARGED ? 'COBRADA' : 'NO COBRADA'} </b></p>
					<p>Fecha de creación: <b>${formatDate(transfer.created_at)} </b></p>
					<p>Monto: <b>${rowData[2]}</b></p>
					<p>Fecha de cobro: <b>${formatDate(transfer.charged_at)} </b></p>`
					: `<p>No hay datos</p>`
				);

			});
		});

		updateButtonsState();
	}

	/** Agrega evento click para paginado hacia adelante */
	nextButton.addEventListener('click', () => {
		if (end >= mockLength) return;

		setStart(start + ROWS_PER_PAGE);
	})

	/** Agrega evento click para paginado hacia atrás */
	previousButton.addEventListener('click', () => {
		if (start === 0) return;

		setStart(start - ROWS_PER_PAGE);
	})

	setStart(0);
}