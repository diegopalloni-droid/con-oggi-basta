import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { DocumentArrowUpIcon } from './icons/DocumentArrowUpIcon';
import { User, UserRole } from '../types';

interface FileUploadProps {
  user: User;
  userFile: { fileName: string } | null;
  role: UserRole;
}

export const FileUpload: React.FC<FileUploadProps> = ({ user, userFile, role }) => {
  const { uploadFile, loading, setError: setGlobalError } = useAppContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null);
    setGlobalError(null);
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalError(null);
    setGlobalError(null);
    // FIX: Correctly access the target value from the event object. The property `event` does not exist on the ChangeEvent type.
    setDescription(event.target.value);
  }

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    setLocalError(null);
    setGlobalError(null);

    let finalFileName: string | undefined = undefined;

    if (role === UserRole.FORZA_VENDITA) {
      if (description.trim().length < 20) {
        setLocalError("La descrizione deve contenere almeno 20 caratteri.");
        return;
      }
      // Formatting date as DD-MM-YYYY
      const today = new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
      finalFileName = `${today} - ${description.trim()}`;
    }

    try {
        await uploadFile(user, selectedFile, finalFileName);
        
        setSelectedFile(null);
        setDescription('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    } catch(err: any) {
        setLocalError(`Error uploading file: ${err.message}`);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Upload Excel File</h2>
      <p className="text-center text-gray-500 mb-6">
        {role === UserRole.FORZA_VENDITA
          ? "Carica il tuo file Excel. Sarà rinominato usando la data e la descrizione fornita."
          : "Carica il tuo file Excel. Solo un file può essere attivo alla volta (il precedente verrà archiviato)."
        }
      </p>
      
      {role === UserRole.FORZA_VENDITA && (
        <div className="mb-6">
          <label htmlFor="file-description" className="text-sm font-medium text-gray-700 block mb-2">
            Descrizione File (min. 20 caratteri)
          </label>
          <textarea
            id="file-description"
            rows={3}
            value={description}
            onChange={handleDescriptionChange}
            className="w-full px-4 py-2 text-gray-900 bg-gray-100/50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-start transition-all"
            placeholder="Inserisci una descrizione dettagliata per il file..."
            required
            minLength={20}
          />
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".xlsx, .xls"
      />

      <div 
        onClick={triggerFileSelect}
        className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-brand-start rounded-xl p-6 text-center transition-colors duration-300"
      >
        <DocumentArrowUpIcon className="w-12 h-12 mx-auto text-gray-400"/>
        <p className="mt-2 text-gray-600">
          {selectedFile ? selectedFile.name : 'Click to select a file'}
        </p>
        <p className="text-xs text-gray-500 mt-1">.xlsx or .xls files only</p>
      </div>

      {localError && (
        <p className="text-sm text-red-700 bg-red-100 p-3 rounded-md border border-red-300 mt-4 text-center">
          {localError}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="w-full mt-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Upload File'
        )}
      </button>

      {userFile && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
          <p className="font-semibold text-green-800">Active File:</p>
          <p className="text-sm text-green-700">{userFile.fileName}</p>
        </div>
      )}
    </div>
  );
};