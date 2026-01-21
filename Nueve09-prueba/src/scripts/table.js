import {TRASFER_STATUS, ROWS_PER_PAGE} from '../utils/constants'
import {formatDate, formatMoney} from '../utils/helpers'
import {showModal} from '../scripts/modal'

/**
 * Esta función se encarga de devolver los datos de la tabla 
 * @param {*} data la lista de datos a mostrar
 * @param {*} start índice que indica desde dónde debe comenzar el arreglo
 * @param {*} end índice que indica el final del arreglo a mostrar
 * @returns 
 */
function renderTableRows(data, start, end) {
  return data.slice(start, end)
    .map(item => `
      <tr class="transfer-item">
        <td title="Estado: ${item.status === TRASFER_STATUS.CHARGED ? 'Cobrada' : 'No cobrada'}${item.charged_at? `, Fecha de cobro: ${formatDate(item.charged_at)}` : '' }">#${item.id}</td>
        <td>${item.company}</td>
        <td>${formatMoney(item.amount)}</td>
      </tr>
    `)
    .join('');
}

/** Datos para paginación */
function getCurrentPage(start) {
  return Math.floor(start / ROWS_PER_PAGE) + 1;
}

function getTotalPages(totalItems) {
  return Math.ceil(totalItems / ROWS_PER_PAGE);
}

function updateFooter(start, totalItems, paginationInfo) {
  const currentPage = getCurrentPage(start);
  const totalPages = getTotalPages(totalItems);

  paginationInfo.textContent = `Página ${currentPage} de ${totalPages}`;
}


/** Clase para manejar la tabla y los filtros */
export class TableManager {
  constructor(data, table, prevBtn, nextBtn, paginationInfo) {
    this.data = data; // datos completos (mockData)
    this.table = table;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
		this.paginationInfo = paginationInfo;

    this.start = 0;
    this.end = this.start + ROWS_PER_PAGE;

    this.filteredData = [...this.data]; // datos filtrados actualmente

    this.attachButtonListeners();
    this.render();
  }

  attachButtonListeners() {
    this.prevBtn.addEventListener('click', () => this.prevPage());
    this.nextBtn.addEventListener('click', () => this.nextPage());
  }

  updateButtons() {
    this.prevBtn.disabled = this.start === 0;
    this.nextBtn.disabled = this.end >= this.filteredData.length;
  }

  render() {
    // Ordenar CHARGED primero y por fecha descendente
    const sorted = [...this.filteredData].sort((a, b) => {
      const aCharged = a.status === TRASFER_STATUS.CHARGED;
      const bCharged = b.status === TRASFER_STATUS.CHARGED;

      if (aCharged && !bCharged) return -1;
      if (!aCharged && bCharged) return 1;

      return b.charged_at.localeCompare(a.charged_at);
    });

    this.table.innerHTML = renderTableRows(sorted, this.start, this.end);
		updateFooter(this.start, this.filteredData.length, this.paginationInfo);

    // Listener para filas
    this.table.querySelectorAll('.transfer-item').forEach(row => {
      row.addEventListener('click', () => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(td => td.textContent);
        const idTransfer = rowData[0].replace('#', '');
        const transfer = sorted.find(d => d.id === idTransfer);

        showModal(
          'Datos de la remesa',
          transfer
            ? `<p>ID: <b>#${transfer.id}</b></p>
               <p>Estado: <b>${transfer.status === TRASFER_STATUS.CHARGED ? 'COBRADA' : 'NO COBRADA'}</b></p>
               <p>Fecha de creación: <b>${formatDate(transfer.created_at)}</b></p>
               <p>Monto: <b>${rowData[2]}</b></p>
               <p>Fecha de cobro: <b>${formatDate(transfer.charged_at)}</b></p>`
            : '<p>No hay datos</p>'
        );
      });
    });

    this.updateButtons();
  }

  nextPage() {
    if (this.end >= this.filteredData.length) return;
    this.start += ROWS_PER_PAGE;
    this.end = this.start + ROWS_PER_PAGE;
    this.render();
  }

  prevPage() {
    if (this.start === 0) return;
    this.start -= ROWS_PER_PAGE;
    this.end = this.start + ROWS_PER_PAGE;
    this.render();
  }

  filter(query) {
    const q = query.toLowerCase();
    this.filteredData = this.data.filter(item =>
      item.id.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.amount.toLowerCase().includes(q)
    );
    this.start = 0;
    this.end = this.start + ROWS_PER_PAGE;
    this.render();
  }
}
