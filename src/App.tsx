import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Keypad } from './components/Keypad/Keypad';
import { RightPanel } from './components/RightPanel/RightPanel';
import { SearchModal } from './components/SearchModal/SearchModal';
import type { Transaction } from './types/transaction';
import { INITIAL_TRANSACTIONS } from './mock/mockData';
import './index.css';

export default function App() {
	const [pinInput, setPinInput] = useState('29939301');
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

	const handleKeyPress = (num: string) => {
		setErrorMessage('');
		setSuccessMessage('');
		if (pinInput.length < 8) {
			setPinInput((prev) => prev + num);
		} else {
			setErrorMessage('El ID no puede tener más de 8 dígitos');
		}
	};

	const handleDelete = () => {
		setErrorMessage('');
		setSuccessMessage('');
		setPinInput((prev) => prev.slice(0, -1));
	};

	const handleProcessCobro = () => {
		setErrorMessage('');
		setSuccessMessage('');

		if (pinInput.length !== 8) {
			setErrorMessage('El ID debe tener exactamente 8 dígitos');
			return;
		}

		const formattedId = `#${pinInput}`;
		const targetTx = transactions.find((tx) => tx.id === formattedId);

		if (!targetTx) {
			setErrorMessage(`No existe la remesa ${formattedId}`);
			return;
		}

		if (targetTx.status === 'COBRADO') {
			setErrorMessage(`La remesa ${formattedId} ya fue cobrada el ${targetTx.charged_at}`);
			return;
		}

		const now = new Date();
		const currentDateFormatted = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

		setTransactions((prev) =>
			prev.map((tx) =>
				tx.id === formattedId
					? { ...tx, status: 'COBRADO', charged_at: currentDateFormatted }
					: tx
			)
		);

		setSuccessMessage(`¡Remesa ${formattedId} cobrada con éxito!`);
		setCurrentPage(1);
	};

	const cobradasTransactions = useMemo(() => {
		return transactions
			.filter((tx) => tx.status === 'COBRADO' && tx.charged_at !== '')
			.sort((a, b) => b.charged_at.localeCompare(a.charged_at));
	}, [transactions]);

	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return cobradasTransactions;
		const query = searchQuery.toLowerCase().trim();

		return cobradasTransactions.filter(
			(tx) =>
				tx.id.toLowerCase().includes(query) ||
				tx.company.toLowerCase().includes(query) ||
				tx.amount.toLowerCase().includes(query)
		);
	}, [cobradasTransactions, searchQuery]);

	const totalPages = Math.ceil(cobradasTransactions.length / itemsPerPage);
	const currentTransactions = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return cobradasTransactions.slice(startIndex, startIndex + itemsPerPage);
	}, [cobradasTransactions, currentPage, itemsPerPage]);


	return (
		<div className="app-container">
			<Sidebar />
			<Keypad
				pinInput={pinInput}
				errorMessage={errorMessage}
				successMessage={successMessage}
				onKeyPress={handleKeyPress}
				onDelete={handleDelete}
				onProcessCobro={handleProcessCobro}
			/>
			<RightPanel
				transactions={currentTransactions}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				onOpenSearch={() => setIsSearchOpen(true)}
			/>
			<SearchModal
				isOpen={isSearchOpen}
				searchQuery={searchQuery}
				results={searchResults}
				onClose={() => {
					setIsSearchOpen(false);
					setSearchQuery('');
				}}
				onSearchChange={setSearchQuery}
			/>
		</div>
	);
}