import React from 'react';
import { FileMetadata } from '../types';
// FIX: Use Firebase v9 compat imports to address errors from using v8 syntax with a v9+ SDK.
// FIX: The `firebase/compat/app` module requires a default import to correctly resolve types from services like firestore.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';

interface FileUploadHistoryProps {
    files: FileMetadata[];
}

// Define Timestamp type alias for v8
type Timestamp = firebase.firestore.Timestamp;

const formatTimestamp = (timestamp?: Timestamp): string => {
    if (!timestamp) {
        return 'Just now';
    }
    try {
        return timestamp.toDate().toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (e) {
        return 'Invalid date';
    }
};

export const FileUploadHistory: React.FC<FileUploadHistoryProps> = ({ files }) => {
    return (
        <div className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200 h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload History</h2>
            {files.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No files uploaded yet.</p>
            ) : (
                <div className="max-h-[28rem] overflow-y-auto pr-2 -mr-2">
                    <ul className="space-y-3">
                        {files.map(file => (
                            <li key={file.id} className="p-3 bg-gray-50/50 rounded-lg flex justify-between items-center border border-gray-200 hover:bg-green-50/80 hover:border-brand-start transition-all duration-200">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-700 truncate" title={file.fileName}>
                                      {file.fileName}
                                      {file.isArchived && (
                                        <span className="ml-2 text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                          Archived
                                        </span>
                                      )}
                                    </p>
                                    <p className="text-xs text-gray-500">{formatTimestamp(file.createdAt)}</p>
                                </div>
                                <a
                                    href={file.downloadURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-4 p-2 text-gray-400 hover:text-brand-start transition-colors"
                                    aria-label={`Download ${file.fileName}`}
                                    title={`Download ${file.fileName}`}
                                >
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};