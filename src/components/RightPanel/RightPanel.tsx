import {
	Bell, ChevronDown, Keyboard, Search, SlidersHorizontal, Printer, ChevronLeft,
	ChevronRight
} from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import './RightPanel.css'

interface RightPanelProps {
	transactions: Transaction[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onOpenSearch: () => void;
}

export const RightPanel =({
	transactions,
	currentPage,
	totalPages,
	onPageChange,
	onOpenSearch,
}: RightPanelProps) => {
	return (
		<aside className="right-panel">
			<div className="user-profile">
				<div className="bell-icon">
					<Bell size={18} />
					<span className="badge">1</span>
				</div>
				<div className="user-info">
					<img
						src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
						alt="Elizabeth"
						className="avatar"
					/>
					<div>
						<span className="user-name">Elizabeth</span>
						<small className="user-role">Operador</small>
					</div>
					<ChevronDown size={16} className="chevron" />
				</div>
			</div>

			<div className="transactions-header">
				<div>
					<h3>Hoy</h3>
					<p className="date">6 de octubre de 2023</p>
				</div>
				<button className="floating-keyboard-btn">
					<Keyboard size={24} />
				</button>
			</div>

			<div className="actions-bar">
				<button
					className="action-btn"
					onClick={onOpenSearch}
					title="Buscar transacciones"
				>
					<Search size={18} />
				</button>
				<button className="action-btn"><SlidersHorizontal size={18} /></button>
				<button className="action-btn"><Printer size={18} /></button>
			</div>

			{/* Lista de Transacciones Cobradas */}
			<div className="transaction-list">
				{transactions.length > 0 ? (
					transactions.map((tx) => (
						<div key={tx.id} className="transaction-item">
							<span className="tx-id">{tx.id}</span>
							<span className="tx-company">{tx.company}</span>
							<span className="tx-amount">{tx.amount}</span>
						</div>
					))
				) : (
					<div className="empty-state">No hay transacciones cobradas</div>
				)}
			</div>

			{totalPages > 1 && (
				<div className="pagination">
					<button
						className="page-btn"
						disabled={currentPage === 1}
						onClick={() => onPageChange(currentPage - 1)}
					>
						<ChevronLeft size={16} />
					</button>
					<span className="page-info">
						{currentPage} de {totalPages}
					</span>
					<button
						className="page-btn"
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(currentPage + 1)}
					>
						<ChevronRight size={16} />
					</button>
				</div>
			)}
		</aside>
	);
}