"use client";
import React, { useState, useEffect } from "react";
import styles from "./Remittances.module.css";
import SearchCalculator from "./SearchCalculator/SearchCalculator";
import RemittancesList from "./RemittancesList/RemittancesList";
import { useNotification } from "@/context/notifications";

function Remittances() {
  const [remittances, setRemittances] = useState([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetch("http://localhost:3000/remittances.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredRemittances = data.filter(
          (remittance) => remittance.status === "COBRADO"
        );
        setRemittances(filteredRemittances);
      });
  }, []);

  async function updateRemittanceStatus(id) {
    try {
      const response = await fetch("http://localhost:3000/remittances.json");
      const data = await response.json();

      const updatedRemittance = data.find((remittance) => remittance.id === id);

      if (updatedRemittance) {
        updatedRemittance.status = "COBRADO";
        updatedRemittance.charged_at = new Date().toISOString().split("T")[0];

        setRemittances((prevRemittances) => [
          ...prevRemittances,
          updatedRemittance,
        ]);

        showNotification(`Remittance updated: ${updatedRemittance.id}`);
        console.log("Remittance updated:", updatedRemittance);
      } else {
        showNotification("Remittance not found");
        console.log("Remittance not found");
      }
    } catch (error) {
      showNotification(`Error updating remittance: ${error}`);
      console.error("Error updating remittance:", error);
    }
  }

  return (
    <div className={`${styles.remittances}`}>
      <SearchCalculator updateRemittanceStatus={updateRemittanceStatus} />
      <RemittancesList payedRemittances={remittances} />
    </div>
  );
}

export default Remittances;
