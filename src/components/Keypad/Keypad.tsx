
import { Delete, CornerDownLeft } from 'lucide-react';
import './Keypad.css';

interface KeypadProps {
	pinInput: string;
	errorMessage: string;
	successMessage: string;
	onKeyPress: (num: string) => void;
	onDelete: () => void;
	onProcessCobro: () => void;
}

export const Keypad =({
	pinInput,
	errorMessage,
	successMessage,
	onKeyPress,
	onDelete,
	onProcessCobro,
}: KeypadProps) => {
	return (
		<main className="main-content">
			<header className="main-header">
				<h2>Ventanilla <strong>Digital</strong></h2>
				<hr className="header-divider" />
			</header>

			<section className="keypad-section">
				<h1 className="title">Remesas</h1>

				<div className="display-box">
					<span className="display-text">#{pinInput}</span>
					<span className="cursor">|</span>
				</div>

				{errorMessage && <div className="alert-message error">{errorMessage}</div>}
				{successMessage && <div className="alert-message success">{successMessage}</div>}

				<div className="keypad-grid">
					<button className="btn-num" onClick={() => onKeyPress('1')}>1</button>
					<button className="btn-num" onClick={() => onKeyPress('2')}>2</button>
					<button className="btn-num" onClick={() => onKeyPress('3')}>3</button>

					<button className="btn-action btn-delete" onClick={onDelete} title="Borrar">
						<Delete size={28} />
					</button>

					<button className="btn-num" onClick={() => onKeyPress('4')}>4</button>
					<button className="btn-num" onClick={() => onKeyPress('5')}>5</button>
					<button className="btn-num" onClick={() => onKeyPress('6')}>6</button>

					<button className="btn-num" onClick={() => onKeyPress('7')}>7</button>
					<button className="btn-num" onClick={() => onKeyPress('8')}>8</button>
					<button className="btn-num" onClick={() => onKeyPress('9')}>9</button>

					<button className="btn-action btn-enter" onClick={onProcessCobro} title="Procesar Cobro">
						<CornerDownLeft size={28} />
					</button>

					<button className="btn-num btn-zero" onClick={() => onKeyPress('0')}>0</button>
					<button className="btn-num">.</button>
				</div>
			</section>
		</main>
	);
}