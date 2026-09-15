"use client";

import { Suspense } from "react";
import CustomTable from "@ui/CustomTable/CustomTable";
import useFormattedDate from "@common/hooks/UseFormattedDate";
import useRemittance from "@remittance/hooks/UseRemittance";
import { PAYMENT_COLUMNS, PaymentRow } from "@remittance/interfaces";
import {
  EMPTY_STRING,
  PER_PAGE_OPTIONS,
  STATUS_COBRADO,
  STATUS_NO_COBRADO,
} from "@common/constants";
import "./style.scss";

function RemittanceContent() {
  const { formattedDate } = useFormattedDate();
  const {
    rows,
    isLoading,
    error,
    search,
    status,
    sortBy,
    sortDirection,
    perPage,
    currentPage,
    totalPages,
    handleSearchChange,
    handleStatusChange,
    handleSort,
    handlePerPageChange,
    handlePreviousPage,
    handleNextPage,
  } = useRemittance();

  return (
    <div className="remittance-container">
      <div className="remittance-container__top">
        <div className="remittance-container__info">
          <div className="remittance-container__info__day">Hoy</div>

          <div className="remittance-container__info__date">
            {formattedDate}
          </div>
        </div>
      </div>

      <div className="remittance-container__filters">
        <input
          className="remittance-container__filters__search"
          type="text"
          placeholder="Buscar por ID, empresa o monto"
          value={search}
          onChange={handleSearchChange}
        />

        <select
          className="remittance-container__filters__status"
          value={status ?? EMPTY_STRING}
          onChange={handleStatusChange}
        >
          <option value={EMPTY_STRING}>Todos</option>
          <option value={STATUS_NO_COBRADO}>No cobrado</option>
          <option value={STATUS_COBRADO}>Cobrado</option>
        </select>
      </div>

      {isLoading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <CustomTable<PaymentRow>
          data={rows}
          schema={PAYMENT_COLUMNS}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}

      <div className="remittance-container__pagination">
        <div className="remittance-container__pagination__per-page">
          <span>Filas por página</span>
          <select value={perPage} onChange={handlePerPageChange}>
            {PER_PAGE_OPTIONS.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        <div className="remittance-container__pagination__controls">
          <button onClick={handlePreviousPage} disabled={currentPage <= 1}>
            Anterior
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Remittance() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RemittanceContent />
    </Suspense>
  );
}
