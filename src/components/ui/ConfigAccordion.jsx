"use client";
import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import { operators } from "@/lib/operators";
import styles from "./UI.module.css";
import { ChevronDown } from "lucide-react";
import LogOutButton from "./LogOutButton";
import ConfigButton from "./ConfigButton";

function ConfigAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={accordionRef} className={`${styles.configAccordion}`}>
      <button onClick={toggleAccordion} className={`${styles.configAccordion}`}>
        <Avatar alt={operators[0].name} image={operators[0].image} />
        <div>
          <p style={{ marginLeft: "8px" }}>{operators[0].name}</p>
          <p style={{ marginLeft: "8px" }}>{operators[0].position}</p>
        </div>
        <ChevronDown className={`${styles.configAccordionChevronIcon}`} />
      </button>
      {isOpen && (
        <div className={`${styles.configAccordionOptions}`}>
          <ul>
            <li>
              <LogOutButton />
            </li>
            <li>
              <ConfigButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ConfigAccordion;
