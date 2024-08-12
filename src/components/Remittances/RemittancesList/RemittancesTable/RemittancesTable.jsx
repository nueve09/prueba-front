"use client";
import React, { useState, useEffect } from "react";
import RemittancesCard from "@/components/ui/RemittancesCard";
import styles from "./RemmitancesTable.module.css";
import SquareIconButton from "@/components/ui/SquareIconButton";
import Input from "@/components/ui/Input";

function RemittancesTable({ payedRemittances }) {
  const [remittances, setRemittances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const sortedRemittances = [...payedRemittances].sort((a, b) => {
      if (!a.charged_at) return 1;
      if (!b.charged_at) return -1;
      return b.charged_at.localeCompare(a.charged_at);
    });

    const filteredRemittances = sortedRemittances.filter((remittance) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        remittance.id.toLowerCase().includes(searchLower) ||
        remittance.company.toLowerCase().includes(searchLower) ||
        remittance.amount.toLowerCase().includes(searchLower)
      );
    });

    setRemittances(filteredRemittances);
  }, [payedRemittances, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastRemittance = currentPage * itemsPerPage;
  const indexOfFirstRemittance = indexOfLastRemittance - itemsPerPage;
  const currentRemittances = remittances.slice(
    indexOfFirstRemittance,
    indexOfLastRemittance
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(remittances.length / itemsPerPage);

  return (
    <div className={`${styles.remittancesTableContainer}`}>
      <div className={`${styles.remittancesSearchAdSortContainer}`}>
        <div className={`${styles.inputSearchList}`}>
          <Input
            textAlign="left"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by ID, company, or amount"
          />
        </div>
        <SquareIconButton type="search" />
        <SquareIconButton type="sort" />
        <SquareIconButton type="print" />
      </div>
      <div className={`${styles.remittancesTable}`}>
        {currentRemittances.length > 0 ? (
          currentRemittances.map((remittance) => (
            <RemittancesCard
              key={remittance.id}
              company={remittance.company}
              amount={remittance.amount}
              id={remittance.id}
            />
          ))
        ) : (
          <div className={`${styles.noRemittances}`}>
            <div>No results</div>
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RemittancesTable;
