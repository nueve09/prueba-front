// ================================
// Items List Component
// ================================

class ItemsList {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.filteredData = this.data.filter((item) => item.status === "COBRADO");
    this.currentPage = 1;
    this.itemsPerPage = 7;
    this.searchVisible = false;
    this.filterVisible = false;
    this.showCobrado = true;
    this.showNoCobrado = false;
    this.init();
  }

  init() {
    this.render();
  }

  attachEventListeners() {
    // Search button
    const searchBtn = document.getElementById("search-btn");
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        this.toggleSearch();
      });
    }

    // Controls button
    const controlsBtn = document.getElementById("controls-btn");
    if (controlsBtn) {
      controlsBtn.addEventListener("click", () => {
        this.toggleFilter();
      });
    }

    // Print button
    const printBtn = document.getElementById("print-btn");
    if (printBtn) {
      printBtn.addEventListener("click", () => this.printTable());
    }

    // Search input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) =>
        this.handleSearch(e.target.value)
      );
    }

    // Filter checkboxes
    const cobradoCheckbox = document.getElementById("filter-cobrado");
    const noCobradoCheckbox = document.getElementById("filter-no-cobrado");

    if (cobradoCheckbox) {
      cobradoCheckbox.addEventListener("change", (e) => {
        this.showCobrado = e.target.checked;
        this.applyFilters();
      });
    }

    if (noCobradoCheckbox) {
      noCobradoCheckbox.addEventListener("change", (e) => {
        this.showNoCobrado = e.target.checked;
        this.applyFilters();
      });
    }
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    const searchInput = document.getElementById("search-input");

    if (searchInput) {
      if (this.searchVisible) {
        searchInput.style.display = "block";
        searchInput.focus();
      } else {
        searchInput.style.display = "none";
        searchInput.value = "";
        this.handleSearch("");
      }
    }
  }

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
    const filterRow = document.getElementById("filter-row");

    if (filterRow) {
      filterRow.style.display = this.filterVisible ? "flex" : "none";
    }
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    this.applyFilters(searchTerm);
  }

  applyFilters(searchTerm = "") {
    // First, filter by status based on checkboxes
    let statusFilteredData = this.data.filter((item) => {
      if (this.showCobrado && item.status === "COBRADO") return true;
      if (this.showNoCobrado && item.status === "NO_COBRADO") return true;
      return false;
    });

    // Then apply search filter
    if (searchTerm === "") {
      this.filteredData = statusFilteredData;
    } else {
      this.filteredData = statusFilteredData.filter(
        (item) =>
          item.id.toLowerCase().includes(searchTerm) ||
          item.company.toLowerCase().includes(searchTerm) ||
          item.amount.includes(searchTerm)
      );
    }

    this.currentPage = 1;
    this.renderList();
    this.renderPagination();
  }

  // Method to add a newly charged item to the list
  addChargedItem(item) {
    // Refresh the filtered data to include the newly charged item
    this.applyFilters();
  }

  printTable() {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate print content
    const printContent = this.generatePrintContent();

    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Items List - Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #333;
                    }
                    h1 {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f3f4f6;
                        font-weight: 600;
                    }
                    .amount {
                        text-align: right;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }
                    @media print {
                        button {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>Western Union - Items List</h1>
                ${printContent}
                <div class="footer">
                    <p>Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `);

    printWindow.document.close();
  }

  generatePrintContent() {
    let html = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company</th>
                        <th class="amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
        `;

    this.filteredData.forEach((item) => {
      html += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.company}</td>
                    <td class="amount">$${this.formatAmount(item.amount)}</td>
                </tr>
            `;
    });

    html += `
                </tbody>
            </table>
        `;

    return html;
  }

  formatAmount(amount) {
    const num = parseFloat(amount);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  getTotalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  getPaginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  goToPage(page) {
    const totalPages = this.getTotalPages();
    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.renderList();
    this.renderPagination();
  }

  render() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    
    this.container.innerHTML = `
            <div class="items-list-container">
                <div class="items-top-header">
                    <div class="user-section">
                        <div class="notification-circle">
                            <i class="fa-solid fa-bell"></i>
                            <span class="notification-badge">3</span>
                        </div>
                        <div class="avatar-circle">Avatar</div>
                        <div class="user-info">
                            <div class="user-name">Usuario</div>
                            <div class="user-title">Operador</div>
                        </div>
                        <div class="menu-arrow">
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                <div class="date-header">
                    <div class="date-section">
                        <div class="date-label">Hoy</div>
                        <div class="date-value">${formattedDate}</div>
                    </div>
                </div>
                <!-- Header with action buttons -->
                <div class="list-header">
                    <div class="header-actions">
                        <input 
                            type="text" 
                            id="search-input" 
                            class="search-input" 
                            placeholder="Buscar por Id, Compañía o Monto..."
                            style="display: none;"
                        />
                        <div class="action-buttons">
                            <button id="search-btn" class="action-btn" title="Search">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <button id="controls-btn" class="action-btn" title="Filter">
                                <i class="fa-solid fa-sliders"></i>
                            </button>
                            <button id="print-btn" class="action-btn" title="Print">
                                <i class="fa-solid fa-print"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="filter-row" class="filter-row" style="display: none;">
                    <label class="filter-checkbox">
                        <input type="checkbox" id="filter-cobrado" checked>
                        <span class="filter-label">Cobrado</span>
                    </label>
                    <label class="filter-checkbox">
                        <input type="checkbox" id="filter-no-cobrado">
                        <span class="filter-label">No Cobrado</span>
                    </label>
                </div>

                <!-- Items list -->
                <div id="items-list" class="items-list">
                </div>

                <!-- Pagination -->
                <div id="pagination" class="pagination">
                </div>
            </div>
        `;

    this.renderList();
    this.renderPagination();
    this.attachEventListeners();
  }

  renderList() {
    const listContainer = document.getElementById("items-list");
    const items = this.getPaginatedData();

    if (items.length === 0) {
      listContainer.innerHTML = `
                <div class="no-items">
                    <i class="fa-solid fa-inbox"></i>
                    <p>No items found</p>
                </div>
            `;
      return;
    }

    let html = '<ul class="items-ul">';

    items.forEach((item) => {
      html += `
                <li class="item-row">
                    <span class="item-id">${item.id}</span>
                    <span class="item-company">${item.company}</span>
                    <span class="item-amount">$${this.formatAmount(
                      item.amount
                    )}</span>
                </li>
            `;
    });

    html += "</ul>";
    listContainer.innerHTML = html;
  }

  renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    const totalPages = this.getTotalPages();

    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let html = '<div class="pagination-controls">';

    // Previous button
    html += `
            <button 
                class="pagination-btn ${
                  this.currentPage === 1 ? "disabled" : ""
                }" 
                onclick="window.itemsList.goToPage(${this.currentPage - 1})"
                ${this.currentPage === 1 ? "disabled" : ""}
            >
                <i class="fa-solid fa-chevron-left"></i>
            </button>
        `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 1 && i <= this.currentPage + 1)
      ) {
        html += `
                    <button 
                        class="pagination-btn ${
                          i === this.currentPage ? "active" : ""
                        }" 
                        onclick="window.itemsList.goToPage(${i})"
                    >
                        ${i}
                    </button>
                `;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        html += `<span class="pagination-ellipsis">...</span>`;
      }
    }

    // Next button
    html += `
            <button 
                class="pagination-btn ${
                  this.currentPage === totalPages ? "disabled" : ""
                }" 
                onclick="window.itemsList.goToPage(${this.currentPage + 1})"
                ${this.currentPage === totalPages ? "disabled" : ""}
            >
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

    html += `</div>`;

    // Page info
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredData.length
    );

    html += `
            <div class="pagination-info">
                Showing ${start}-${end} of ${this.filteredData.length} items
            </div>
        `;

    paginationContainer.innerHTML = html;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (typeof itemsData !== "undefined") {
    window.itemsList = new ItemsList("items-list-container", itemsData);
  }
});
