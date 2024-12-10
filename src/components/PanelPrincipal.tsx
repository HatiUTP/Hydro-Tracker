// PanelPrincipal.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PanelPrincipal.css';

interface ConsumoAgua {
  actual: number;
  meta: number;
}

const PanelPrincipal: React.FC = () => {
  const [consumo, setConsumo] = useState<ConsumoAgua>({
    actual: 0,
    meta: 2
  });
  const navigate = useNavigate();

  useEffect(() => {
    const metaGuardada = localStorage.getItem('metaAgua');
    const consumoGuardado = localStorage.getItem('consumoActual');
    
    setConsumo({
      actual: consumoGuardado ? parseFloat(consumoGuardado) : 0,
      meta: metaGuardada ? parseFloat(metaGuardada) : 2
    });
  }, []);

  const registrarConsumo = (cantidad: number): void => {
    const nuevoConsumo = consumo.actual + cantidad;
    setConsumo(prev => ({
      ...prev,
      actual: nuevoConsumo
    }));
    localStorage.setItem('consumoActual', nuevoConsumo.toString());
  };

  const establecerNuevaMeta = (): void => {
    navigate('/configuracion');
  };

  const progreso = (consumo.actual / consumo.meta) * 100;

  return (
    <div className="panel-container">
      <h2>Seguimiento Diario de Agua</h2>
      
      <div className="estado-actual">
        <div className="barra-progreso">
          <div 
            className="progreso-fill"
            style={{ width: `${Math.min(progreso, 100)}%` }}
          />
        </div>
        <p className="datos-consumo">
          Consumido: {consumo.actual.toFixed(2)}L / Meta: {consumo.meta}L
        </p>
      </div>

      <div className="acciones-consumo">
        <button 
          onClick={() => registrarConsumo(0.25)}
          className="btn-registro"
        >
          Agregar 250ml
        </button>
        <button 
          onClick={() => registrarConsumo(0.5)}
          className="btn-registro"
        >
          Agregar 500ml
        </button>
      </div>

      {consumo.actual >= consumo.meta && (
        <div className="meta-completada">
          <div className="mensaje-exito">
            🎉 ¡Felicitaciones! Has alcanzado tu meta diaria
          </div>
          <button 
            onClick={establecerNuevaMeta}
            className="btn-nueva-meta"
          >
            Establecer Nueva Meta
          </button>
        </div>
      )}
    </div>
  );
};

export default PanelPrincipal;