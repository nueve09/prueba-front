import { useState, useMemo } from "react";
import { useRemesas } from "../../../stores/RemesasContext";
import { InputForm } from "../../../components/form/InputForm";
import { CustomButton } from "../../../components/common/CustomButton";
import "../styles/RemesasTable.css";

export { RemesasTable };

interface RemesasTableProps {
  isCalculatorVisible?: boolean;
  onToggleCalculator?: () => void;
}

function RemesasTable({
  isCalculatorVisible = true,
  onToggleCalculator,
}: RemesasTableProps): React.ReactElement {
  const { remesas } = useRemesas();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"COBRADO" | "NO_COBRADO">(
    "COBRADO",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    let result = remesas.filter((r) => r.status === statusFilter);

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.id.includes(lowerTerm) ||
          r.company.toLowerCase().includes(lowerTerm) ||
          r.amount.includes(lowerTerm),
      );
    }

    return result.sort((a, b) => {
      const dateA = a.charget_at || a.created_at;
      const dateB = b.charget_at || b.created_at;
      return dateB.localeCompare(dateA);
    });
  }, [remesas, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const fechaActual = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const handleFilterChange = (status: "COBRADO" | "NO_COBRADO") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <section className="remesas-list-section">
      <header className="list-header">
        <div className="date-info">
          <h2>Hoy</h2>
          <p>{fechaActual}</p>
        </div>

        <div className="header-actions-wrapper">
          <div className="user-profile">
            <i className="fa-regular fa-bell"></i>
            <div className="avatar-info">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="User"
              />
              <div className="user-text">
                <span className="name">Elizabeth</span>
                <span className="role">Operador</span>
              </div>
            </div>
          </div>

          {onToggleCalculator && (
            <button
              className="keyboard-btn"
              onClick={onToggleCalculator}
              title={
                isCalculatorVisible ? "Ocultar teclado" : "Mostrar teclado"
              }
            >
              <i className="fa-solid fa-keyboard"></i>
            </button>
          )}
        </div>
      </header>

      <div className="toolbar">
        <InputForm
          placeholder="Buscar por ID, compañía o monto..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          icon={<i className="fa-solid fa-magnifying-glass"></i>}
        />

        <div className="toolbar-actions">
          <div className="status-switch">
            <button
              className={`switch-btn ${statusFilter === "COBRADO" ? "active" : ""}`}
              onClick={() => handleFilterChange("COBRADO")}
            >
              Cobrados
            </button>
            <button
              className={`switch-btn ${statusFilter === "NO_COBRADO" ? "active" : ""}`}
              onClick={() => handleFilterChange("NO_COBRADO")}
            >
              No Cobrados
            </button>
          </div>

          <div className="action-buttons">
            <CustomButton
              variant="icon"
              icon={<i className="fa-solid fa-magnifying-glass"></i>}
            />
            <CustomButton
              variant="icon"
              icon={<i className="fa-solid fa-sliders"></i>}
            />
            <CustomButton
              variant="icon"
              icon={<i className="fa-solid fa-print"></i>}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        {paginatedData.length > 0 ? (
          paginatedData.map((remesa) => (
            <div key={remesa.id} className="table-row">
              <span className="col-id">#{remesa.id}</span>
              <span className="col-company">{remesa.company}</span>
              <span className="col-amount">
                $
                {Number(remesa.amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))
        ) : (
          <p className="no-data">
            No se encontraron remesas{" "}
            {statusFilter === "COBRADO" ? "cobradas" : "sin cobrar"}.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <CustomButton
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Anterior
          </CustomButton>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <CustomButton
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Siguiente
          </CustomButton>
        </div>
      )}
    </section>
  );
}
