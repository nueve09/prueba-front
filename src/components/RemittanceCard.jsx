const RemittanceCard = ({ remittance }) => {
  return (
    <section className="flex justify-between border-t-[3px] border-light-gray pt-3 pb-9 text-2xl text-gray-500 font-semibold">
      <div className="flex sm:gap-16 gap-4 flex-wrap">
        <h2>#{remittance.id}</h2>
        <h2 className="w-[200px]">{remittance.company}</h2>
        <h2>{remittance.charged_at == ""? `NO COBRADO`: `COBRADO`}</h2>
      </div>
      <h2 className="w-[120px]">${remittance.amount}</h2>
    </section>
  );
};
export default RemittanceCard;
