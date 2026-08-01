import { Search, X } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import './SearchModal.css'

interface SearchModalProps {
	isOpen: boolean;
	searchQuery: string;
	results: Transaction[];
	onClose: () => void;
	onSearchChange: (query: string) => void;
}

export const SearchModal =({
	isOpen,
	searchQuery,
	results,
	onClose,
	onSearchChange,
}: SearchModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h3>Buscar Transacción Cobrada</h3>
					<button className="close-btn" onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				<div className="search-input-wrapper">
					<Search size={18} className="search-icon" />
					<input
						type="text"
						className="modal-search-input"
						placeholder="Buscar por ID, compañía o monto..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						autoFocus
					/>
					{searchQuery && (
						<button className="clear-search-btn" onClick={() => onSearchChange('')}>
							<X size={16} />
						</button>
					)}
				</div>

				<div className="modal-results">
					{results.length > 0 ? (
						results.map((tx) => (
							<div key={tx.id} className="transaction-item result-item">
								<span className="tx-id">{tx.id}</span>
								<span className="tx-company">{tx.company}</span>
								<span className="tx-amount">{tx.amount}</span>
							</div>
						))
					) : (
						<div className="empty-state">
							No se encontraron coincidencias para "{searchQuery}"
						</div>
					)}
				</div>
			</div>
		</div>
	);
}