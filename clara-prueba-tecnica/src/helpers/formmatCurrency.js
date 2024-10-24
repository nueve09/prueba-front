export const formmatCurrency = (amount) => {
     amount = parseFloat(amount);
        return amount
                .toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})
                .replace('MXN', '$');
};