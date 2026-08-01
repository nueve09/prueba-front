import type { Transaction } from '../types/transaction';

export const INITIAL_TRANSACTIONS: Transaction[] = [
	{ id: '#29939301', company: 'Western Union', amount: '$12,000.00', status: 'NO_COBRADO', created_at: '20231203', charged_at: '' },
	{ id: '#29939302', company: 'Western Union', amount: '$15,500.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 10:30' },
	{ id: '#29939303', company: 'Ria Money Transfer', amount: '$8,200.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 11:15' },
	{ id: '#29939304', company: 'Western Union', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 14:20' },
	{ id: '#29939305', company: 'MoneyGram', amount: '$5,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 14:20' },
	{ id: '#29939306', company: 'Western Union', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 15:00' },
	{ id: '#29939307', company: 'Ria Money Transfer', amount: '$10,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 16:45' },
	{ id: '#29939308', company: 'Western Union', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 17:10' },
	{ id: '#29939309', company: 'MoneyGram', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 18:00' },
	{ id: '#29939310', company: 'Western Union', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 18:30' },
	{ id: '#29939311', company: 'Western Union', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 19:00' },
	{ id: '#29939312', company: 'MoneyGram', amount: '$12,000.00', status: 'COBRADO', created_at: '20231203', charged_at: '2023-12-03 19:00' },
];