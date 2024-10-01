'use client'
import React, { useState } from 'react';
import "./style.css";

export default function Home() {
    const [value, setValue] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [plano, setPlano] = useState(0)
    const [unit, setUnit] = useState('hours');
    const [copySuccess, setCopySuccess] = useState('Copiar');



    const handleMonthChange = (e: any) => {
      setSelectedMonth(e.target.value);
    };

    const handlePlanoChange = (e:any) => {
        setPlano(e.target.value);
    };

    const handleValueChange = (e:any) => {
        setValue(e.target.value);
    };

    const handleUnitChange = (e:any) => {
        setUnit(e.target.value);
    };


    const getDaysInSelectedMonth = () => {
      if (!selectedMonth) return 0;
      
      const [year, month] = selectedMonth.split('-').map(Number);
      const daysInMonth = new Date(year, month, 0).getDate(); // Obtém o último dia do mês
      return daysInMonth;
    };


    const calculate = () => {
      if (!plano || !selectedMonth || value <= 0) {
        return 0; 
      }

      const daysInCurrentMonth = getDaysInSelectedMonth(); 
      const discountMouth = plano/daysInCurrentMonth
  
        if (unit === 'hours') {
            const discountDay = discountMouth/24
        
            if(value <= 4) {
                return discountDay*4
            } else {
                return discountDay*value;  
            }
        } else if (unit === 'days') {
          return discountMouth * value;  
        } 
     
    };

      const formatToCurrency = (value:any) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 3,
        }).format(value);
      };

      const copyToClipBoard = async (copyMe: any) => {
        try {
          await navigator.clipboard.writeText(copyMe); 
          setCopySuccess('Copied!');  

        } catch (err) {
          setCopySuccess('Failed to copy!');  
        }

        setTimeout(() => {
          setCopySuccess('Copiar');  
        }, 2000);
      };
    

    return (
        <div className='fundo'>
          <div className='container'>
            <div className='section'>
              <div className='header'>
                <img src="https://maisinternet.net.br/site/wp-content/uploads/2024/02/LOGO-NOVA-2-edited.png" alt="logo"/>
                <h1>Calculadora de desconto</h1>
              </div>
              <div className='calculadora'>
                <label> Valor do plano do cliente</label>
                <input 
                className='input-plano'
                type="number"
                value={plano}
                onChange={handlePlanoChange}
                />
                <label> Mês que se trata</label>
                <input type="month" onChange={handleMonthChange} />

                <label>Quanto que o cliente ficou sem conexão </label>
                <div className='container-input-desconto'>
                    <input
                    className='input-desconto'
                    type="number"
                    value={value}
                    onChange={handleValueChange}
                    />
                    <select className='select-desconto' value={unit} onChange={handleUnitChange}>
                      <option value="hours">Horas</option>
                      <option value="days">Dias</option>
                    </select>
                </div>
                  <label> Desconto</label>
                  <div className='result'>
                    <p>{formatToCurrency(calculate() || 0)}</p>
                    <button 
                      className='copy' 
                      onClick={() => copyToClipBoard(formatToCurrency(calculate() || 0))}
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
