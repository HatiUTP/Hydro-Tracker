// src/components/ConfiguracionUsuario.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfiguracionUsuario.css';

interface MetaAgua {
  cantidad: number;
}

const ConfiguracionUsuario: React.FC = () => {
  const [meta, setMeta] = useState<MetaAgua>({ cantidad: 2 }); // Por defecto 2 litros
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (meta.cantidad > 0) {
      localStorage.setItem('metaAgua', meta.cantidad.toString());
      localStorage.setItem('consumoActual', '0'); // Reiniciar consumo
      navigate('/panel');
    }
  };

  return (
    <div className="config-container">
      <form onSubmit={handleSubmit} className="config-form">
        <h2>Configura tu Meta Diaria de Agua</h2>
        <div className="form-group">
          <label htmlFor="metaAgua">Meta diaria (litros):</label>
          <input
            id="metaAgua"
            type="number"
            min="0.5"
            step="0.5"
            value={meta.cantidad}
            onChange={(e) => setMeta({ cantidad: parseFloat(e.target.value) })}
            required
          />
        </div>
        <button type="submit" className="btn-guardar">
          Guardar y Continuar
        </button>
      </form>
    </div>
  );
};

export default ConfiguracionUsuario;