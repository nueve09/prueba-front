import Calculator from '../../features/calculator/components/Calculator';
import './CalculatorSection.css';

const CalculatorSection = () => {
  return (
    <section className="calculator-section">
      <div className="calculator-section__header">
        <h1 className="calculator-section__title">
          <span className="title-normal">Ventanilla</span>
          <span className="title-bold">Digital</span>
        </h1>
        <div className="calculator-section__divider"></div>
        <h2 className="calculator-section__subtitle">Remesas</h2>
      </div>
      
      <div className="calculator-section__content">
        <Calculator />
      </div>
    </section>
  );
};

export default CalculatorSection;
