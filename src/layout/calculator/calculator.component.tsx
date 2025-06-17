import { type FC } from "react";
import { FaBackspace } from "react-icons/fa";
import { FaArrowTurnUp } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./Calculator.css";
import { useConsignmentContext } from "../../hooks/useCondignmentContext";
import { ConsignmentStatus } from "../../data/models/consignment.model";
import { useSnackbar } from "../../hooks/useSnackBar";

type CalculatorButton = {
  children: React.ReactNode;
  value: string;
  area?: string;
  className?: string;
};

const buttons: CalculatorButton[][] = [
  [
    { children: "1", value: "1" },
    { children: "2", value: "2" },
    { children: "3", value: "3" },
    {
      children: <FaBackspace />,
      value: "backspace",
      area: "backspace",
    },
  ],
  [
    { children: "4", value: "4" },
    { children: "5", value: "5" },
    { children: "6", value: "6" },
  ],
  [
    { children: "7", value: "7" },
    { children: "8", value: "8" },
    { children: "9", value: "9" },
    {
      children: (
        <FaArrowTurnUp style={{ transform: "rotate(90deg) rotateX(180deg)" }} />
      ),
      value: "enter",
      area: "enter",
      className: "calculator__button--enter",
    },
  ],
  [
    { children: "0", value: "0" },
    {
      children: ".",
      value: ".",
      area: "dot",
    },
  ],
];

const Calculator: FC = () => {
  const { consignments, setPaidConsignments } = useConsignmentContext();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      display: "",
    },
    validationSchema: Yup.object({
      display: Yup.string()
        .matches(/^\d*\.?\d*$/, "Only numbers and dot are allowed")
        .length(8, "An ID must be 8 characters long")
        .required("ID is required"),
    }),
    onSubmit: (values) => {
      const consignment = consignments.find(
        (c) => c.id === values.display && c.status === ConsignmentStatus.UNPAID,
      );

      if (!consignment) {
        showSnackbar({
          message: `Remesa ${values.display} no encontrada o ya cobrada`,
          severity: "error",
        });
        return;
      }

      const updatedConsignment = {
        ...consignment,
        status: ConsignmentStatus.PAID,
        charged_at: new Date().toISOString(),
      };
      setPaidConsignments((prev) => [...prev, updatedConsignment]);
      formik.setFieldValue("display", "");
      showSnackbar({
        message: `Remesa ${values.display} cobrada exitosamente`,
        severity: "success",
      });
    },
  });

  const handleClick = (value: string) => {
    console.log("Button clicked:", value);
    if (value === "backspace") {
      formik.setFieldValue("display", formik.values.display.slice(0, -1));
    } else if (value === "enter") {
      formik.handleSubmit();
    } else if (formik.values.display.length < 8) {
      formik.setFieldValue("display", formik.values.display + value);
    }
  };

  return (
    <div className="calculator">
      <h4 className="calculator__title">
        Ventanilla <b>Digital</b>
      </h4>
      <hr />
      <form className="calculator__form" onSubmit={formik.handleSubmit}>
        <h3 className="calculator__subtitle">Remesas</h3>
        <div className="calculator__display">
          <input
            type="text"
            value={formik.values.display}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="display"
            className="calculator__input"
            placeholder="0"
          />
        </div>
        {formik.touched.display && formik.errors.display && (
          <div className="calculator__error">{formik.errors.display}</div>
        )}
        <div className="calculator__buttons">
          {buttons.flat().map((btn, index) => (
            <button
              key={`calculator-btn-${index}`}
              className={`calculator__button ${btn.className || ""}`}
              style={{ gridArea: btn.area ? btn.area : `b${btn.value}` }}
              onClick={
                btn.value === "enter" ? undefined : () => handleClick(btn.value)
              }
              type={btn.value === "enter" ? "submit" : "button"}
            >
              {btn.children}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Calculator;
