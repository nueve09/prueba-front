export interface Transaction {
	id: string;
	company: string;
	amount: string;
	status: 'COBRADO' | 'NO_COBRADO';
	created_at: string;
	charged_at: string;
}