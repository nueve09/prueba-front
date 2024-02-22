import { useEffect, useState } from "react";
import { Input } from "../../../../components/Input/Input";
import { useSearchToolsActions } from "./useSearchToolsActions";

function SearchTools() {
  const { searchInList } = useSearchToolsActions();
  const [searchId, setSearchId] = useState<string>("");
  const [searchCompany, setSearchCompany] = useState<string>("");
  const [searchAmount, setSearchAmount] = useState<string>("");

  useEffect(() => {
    searchInList({ searchId, searchCompany, searchAmount });
  }, [searchId, searchCompany, searchAmount, searchInList]);

  return (
    <div className="grid grid-cols-3 gap-4 pt-2.5">
      <Input
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        label="Id"
        className="bg-slate-200 rounded-lg pl-1.5 border-solid border border-slate-800"
      />
      <Input
        value={searchCompany}
        onChange={(e) => setSearchCompany(e.target.value)}
        label="Compañia"
        className="bg-slate-200 rounded-lg pl-1.5 border-solid border border-slate-800"
      />
      <Input
        value={searchAmount}
        onChange={(e) => setSearchAmount(e.target.value)}
        label="Monto"
        className="bg-slate-200 rounded-lg pl-1.5 border-solid border border-slate-800"
      />
    </div>
  );
}

export default SearchTools;
