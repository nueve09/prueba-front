import { useMemo, useState, type FC, type FormEvent } from "react";
import "./search.css";
import { useConsignmentContext } from "../../../../hooks/useCondignmentContext";
import { type PaidConsignment } from "../../../../data/models/consignment.model";

const SearchPanel: FC = () => {
  const [id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");

  const {
    showSearchPanel,
    paidConsignments,
    setPaidConsignments,
    consignments,
  } = useConsignmentContext();

  const uniqueCompaniesNames = useMemo(() => {
    const companies = paidConsignments.map((c) => c.company);
    return Array.from(new Set(companies)).sort();
  }, [paidConsignments]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const filteredConsignments = consignments.filter((c) => {
      const matchesId = id ? c.id.includes(id) : true;
      const matchesCompany = company ? c.company === company : true;
      const matchesAmount = amount ? Number(c.amount) === Number(amount) : true;
      const isPaid = c.status === "PAID";

      return matchesId && matchesCompany && matchesAmount && isPaid;
    });

    setPaidConsignments(filteredConsignments as PaidConsignment[]);
  };

  if (!showSearchPanel) return null;

  return (
    <div className="search-panel">
      <form className="search-panel__form" onSubmit={handleSearch}>
        <div>
          <label className="search-panel__label" htmlFor="search-id">
            ID
          </label>
          <input
            id="search-id"
            className="search-panel__input"
            type="text"
            placeholder="Buscar por ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label className="search-panel__label" htmlFor="search-company">
            Compañía
          </label>
          <select
            id="search-company"
            className="search-panel__select"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">Seleccionar compañía</option>
            {uniqueCompaniesNames.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="search-panel__label" htmlFor="search-amount">
            Monto
          </label>
          <input
            id="search-amount"
            className="search-panel__input"
            type="number"
            placeholder="Buscar por monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="search-panel__button" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchPanel;
