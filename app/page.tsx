"use client";
import React, { useState } from "react";
import "./style.css";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [plano, setPlano] = useState<string>("");
  const [unit, setUnit] = useState<"hours" | "days">("hours");
  const [copySuccess, setCopySuccess] = useState<string>("Copiar");

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handlePlanoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlano(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value as "hours" | "days");
  };

  const getDaysInSelectedMonth = (): number => {
    if (!selectedMonth) return 0;
    const [year, month] = selectedMonth.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();  
    return daysInMonth;
  };

  const calculate = (): number => {
    // Verificar se os campos estão preenchidos corretamente
    const planoNumber = Number(plano);
    const valueNumber = Number(value);

    if (!planoNumber || !selectedMonth || valueNumber <= 0) {
      return 0;
    }

    const daysInCurrentMonth = getDaysInSelectedMonth();
    const discountMouth = planoNumber / daysInCurrentMonth;

    if (unit === "hours") {
      const discountDay = discountMouth / 24;
      return discountDay * valueNumber;
    } else if (unit === "days") {
      return discountMouth * valueNumber;
    }

    return 0;
  };

  const formatToCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 3,
    }).format(value);
  };

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copiado!");
    } catch (err) {
      setCopySuccess("Falha ao copiar!");
    }

    setTimeout(() => {
      setCopySuccess("Copiar");
    }, 2000);
  };

  return (
    <div className="fundo">
      <div className="container">
        <div className="section">
          <div className="header">
            <img
              src="https://maisinternet.net.br/site/wp-content/uploads/2024/02/LOGO-NOVA-2-edited.png"
              alt="logo"
            />
            <h1>Calculadora de desconto</h1>
          </div>
          <div className="calculadora">
            <label> Valor do plano </label>
            <input
              className="input-plano"
              type="number"
              value={plano}
              onChange={handlePlanoChange}
            />
            <label> Mês que se trata</label>
            <input type="month" onChange={handleMonthChange} />

            <label>Tempo que o cliente ficou desconectado</label>
            <div className="container-input-desconto">
              <input
                className="input-desconto"
                type="number"
                value={value}
                onChange={handleValueChange}
              />
              <select
                className="select-desconto"
                value={unit}
                onChange={handleUnitChange}
              >
                <option value="hours">Horas</option>
                <option value="days">Dias</option>
              </select>
            </div>
            <label> Desconto</label>
            <div className="result">
              <p>{formatToCurrency(calculate() || 0)}</p>
              <button
                className="copy"
                onClick={() =>
                  copyToClipBoard(formatToCurrency(calculate() || 0))
                }
              >
                {copySuccess}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
