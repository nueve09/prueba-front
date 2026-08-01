import { Home, DollarSign, CreditCard, FileText, Repeat, Folder } from 'lucide-react';
import './Sidebar.css';
export const Sidebar = () => {
	return (
		<aside className="sidebar">
			<div className="logo-container">
				<div className="logo">
					<span>nc<small>s</small></span>
				</div>
				<button className="collapse-btn">›</button>
			</div>

			<nav className="nav-menu">
				<button className="nav-item"><Home size={20} /></button>
				<button className="nav-item active"><DollarSign size={20} /></button>
				<button className="nav-item"><CreditCard size={20} /></button>
				<button className="nav-item"><FileText size={20} /></button>
				<button className="nav-item"><Repeat size={20} /></button>
				<button className="nav-item"><Folder size={20} /></button>
			</nav>
		</aside>
	);
}