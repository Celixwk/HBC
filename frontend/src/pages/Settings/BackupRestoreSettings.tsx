import React, { useState, useRef } from 'react';
import { Download, Upload, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';

export const BackupRestoreSettings: React.FC = () => {
  const { logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDownloadBackup = () => {
    // Open the download URL in a new tab to trigger the browser's download
    window.open('http://127.0.0.1:5001/api/configuracion/backup', '_blank');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.sql')) {
      setError('Por favor, selecciona un archivo SQL válido (.sql)');
      return;
    }

    const confirmMessage = "⚠️ ADVERTENCIA MUY IMPORTANTE ⚠️\n\nAl restaurar esta copia de seguridad, TODA la información actual del sistema (huéspedes, reservas, facturas, configuración) será ELIMINADA y reemplazada por la del archivo.\n\n¿Estás COMPLETAMENTE SEGURO de que deseas continuar?";
    
    if (window.confirm(confirmMessage)) {
      restoreFromFile(file);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const restoreFromFile = async (file: File) => {
    setRestoring(true);
    setError('');
    setSuccess('');

    try {
      const sqlContent = await file.text();
      
      const res = await fetch('http://127.0.0.1:5001/api/configuracion/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: sqlContent
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al restaurar la base de datos');
      }

      setSuccess('Base de datos restaurada correctamente. Reiniciando sesión...');
      
      // Give time to read message then force logout so the app refreshes state from DB
      setTimeout(() => {
        logout();
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocurrió un error inesperado al restaurar');
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="settings-form glass-panel mt-6">
      <div className="settings-section-title">
        <Database size={16} /> Respaldo y Restauración
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Guarda una copia de seguridad de toda tu información o restaura el sistema desde una copia anterior. Es recomendable hacer respaldos periódicos.
      </p>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start">
          <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-start">
          <CheckCircle className="mr-2 flex-shrink-0" size={20} />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup Card */}
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center bg-white">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Download size={32} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Crear Copia de Seguridad</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Descarga un archivo .sql con toda la información actual de tu base de datos.
          </p>
          <Button variant="primary" onClick={handleDownloadBackup} className="w-full justify-center">
            Descargar Respaldo
          </Button>
        </div>

        {/* Restore Card */}
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center bg-white">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <Upload size={32} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Restaurar Sistema</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Carga un archivo de respaldo anterior. <strong className="text-red-500">¡Reemplazará tus datos actuales!</strong>
          </p>
          
          <input 
            type="file" 
            accept=".sql" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
          />
          
          <Button 
            variant="danger" 
            onClick={() => fileInputRef.current?.click()} 
            disabled={restoring}
            className="w-full justify-center"
          >
            {restoring ? 'Restaurando...' : 'Subir Archivo y Restaurar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
