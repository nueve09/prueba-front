// README: lista de objetos con información de más de 12 remesas
const remesas = [
  { id: '10000001', company: 'Western Union', amount: '12000', status: 'NO_COBRADO', created_at: '20231203', charged_at: '20231203' },
  { id: '10000002', company: 'MoneyGram', amount: '8500', status: 'NO_COBRADO', created_at: '20231205', charged_at: '20231205' },
  { id: '10000003', company: 'Ria Money Transfer', amount: '4300', status: 'NO_COBRADO', created_at: '20231207', charged_at: '20231208' },
  { id: '10000004', company: 'Remitly', amount: '15600', status: 'NO_COBRADO', created_at: '20231210', charged_at: '20231210' },
  { id: '10000005', company: 'Xoom', amount: '9200', status: 'NO_COBRADO', created_at: '20231212', charged_at: '20231212' },
  { id: '10000006', company: 'Western Union', amount: '22000', status: 'NO_COBRADO', created_at: '20231215', charged_at: '20231216' },
  { id: '10000007', company: 'WorldRemit', amount: '6100', status: 'NO_COBRADO', created_at: '20231218', charged_at: '20231218' },
  { id: '10000008', company: 'MoneyGram', amount: '13400', status: 'NO_COBRADO', created_at: '20231220', charged_at: '20231220' },
  { id: '10000009', company: 'Ria Money Transfer', amount: '7800', status: 'NO_COBRADO', created_at: '20231222', charged_at: '20231223' },
  { id: '10000010', company: 'Remitly', amount: '18900', status: 'NO_COBRADO', created_at: '20231225', charged_at: '20231225' },
  { id: '10000011', company: 'Xoom', amount: '5000', status: 'NO_COBRADO', created_at: '20231228', charged_at: '20231228' },
  { id: '10000012', company: 'WorldRemit', amount: '11200', status: 'NO_COBRADO', created_at: '20231230', charged_at: '20231231' },
  { id: '10000013', company: 'Western Union', amount: '9600', status: 'NO_COBRADO', created_at: '20240102', charged_at: '20240102' },
  { id: '10000014', company: 'MoneyGram', amount: '14700', status: 'NO_COBRADO', created_at: '20240104', charged_at: '20240104' },
  { id: '10000015', company: 'Ria Money Transfer', amount: '3200', status: 'NO_COBRADO', created_at: '20240106', charged_at: '20240106' },
  { id: '10000016', company: 'Remitly', amount: '20500', status: 'NO_COBRADO', created_at: '20240108', charged_at: '20240109' },
  { id: '10000017', company: 'Xoom', amount: '8800', status: 'NO_COBRADO', created_at: '20240110', charged_at: '20240111' },
  { id: '10000018', company: 'WorldRemit', amount: '16300', status: 'NO_COBRADO', created_at: '20240112', charged_at: '20240112' },
  { id: '10000019', company: 'Western Union', amount: '7400', status: 'NO_COBRADO', created_at: '20240114', charged_at: '20240114' },
  { id: '10000020', company: 'MoneyGram', amount: '19800', status: 'NO_COBRADO', created_at: '20240116', charged_at: '20240116' },
  { id: '10000021', company: 'Ria Money Transfer', amount: '10500', status: 'NO_COBRADO', created_at: '20240118', charged_at: '20240118' },
  { id: '10000022', company: 'Remitly', amount: '6700', status: 'NO_COBRADO', created_at: '20240120', charged_at: '20240121' },
  { id: '10000023', company: 'Xoom', amount: '12900', status: 'NO_COBRADO', created_at: '20240122', charged_at: '20240123' },
  { id: '10000024', company: 'WorldRemit', amount: '4600', status: 'NO_COBRADO', created_at: '20240124', charged_at: '20240124' },
  { id: '10000025', company: 'Western Union', amount: '17200', status: 'NO_COBRADO', created_at: '20240126', charged_at: '20240126' },
  { id: '10000026', company: 'MoneyGram', amount: '9300', status: 'NO_COBRADO', created_at: '20240128', charged_at: '20240129' },
  { id: '10000027', company: 'Ria Money Transfer', amount: '5800', status: 'NO_COBRADO', created_at: '20240130', charged_at: '20240130' },
  { id: '10000028', company: 'Remitly', amount: '21000', status: 'NO_COBRADO', created_at: '20240201', charged_at: '20240201' },
  { id: '10000029', company: 'Xoom', amount: '7100', status: 'NO_COBRADO', created_at: '20240203', charged_at: '20240203' },
  { id: '10000030', company: 'WorldRemit', amount: '13600', status: 'NO_COBRADO', created_at: '20240205', charged_at: '20240206' },
  { id: '10000031', company: 'Western Union', amount: '10200', status: 'COBRADO', created_at: '20240207', charged_at: '20240207' },
  { id: '10000032', company: 'MoneyGram', amount: '15800', status: 'COBRADO', created_at: '20240209', charged_at: '20240209' },
  { id: '10000033', company: 'Ria Money Transfer', amount: '6400', status: 'COBRADO', created_at: '20240211', charged_at: '20240212' },
  { id: '10000034', company: 'Remitly', amount: '19300', status: 'COBRADO', created_at: '20240213', charged_at: '20240213' },
  { id: '10000035', company: 'Xoom', amount: '8100', status: 'COBRADO', created_at: '20240215', charged_at: '20240215' },
  { id: '10000036', company: 'WorldRemit', amount: '23400', status: 'COBRADO', created_at: '20240217', charged_at: '20240218' },
  { id: '10000037', company: 'Western Union', amount: '5600', status: 'COBRADO', created_at: '20240219', charged_at: '20240219' },
  { id: '10000038', company: 'MoneyGram', amount: '17900', status: 'COBRADO', created_at: '20240221', charged_at: '20240221' },
  { id: '10000039', company: 'Ria Money Transfer', amount: '9700', status: 'COBRADO', created_at: '20240223', charged_at: '20240224' },
  { id: '10000040', company: 'Remitly', amount: '20100', status: 'COBRADO', created_at: '20240225', charged_at: '20240225' },
];

const formatAmount = (amount) => {
  return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export {
  remesas,
  formatAmount,
};
