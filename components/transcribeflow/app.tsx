'use client';

import React, { useEffect } from 'react';
import { AppStateProvider } from './contexts/app-state-context';
import { RecordingPanel } from './recording-panel';
import { EditorPanel } from './editor-panel';
import { SessionsPanel } from './sessions-panel';
import { SettingsModal } from './settings-modal';
import { ExportModal } from './export-modal';
import { SessionPickerModal } from './session-picker-modal';
import { DownloadSection } from './download-section';
import { useKeyboardShortcuts } from './hooks/use-keyboard-shortcuts';
import { useTheme } from './hooks/use-theme';
import './styles.css';

function TranscribeFlowContent() {
  const { theme } = useTheme();
  useKeyboardShortcuts();
  
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">TranscribeFlow Professional</h1>
        <div className="header-actions">
          <DownloadSection />
        </div>
      </header>
      
      <main className="app-main">
        <RecordingPanel />
        <EditorPanel />
        <SessionsPanel />
      </main>
      
      <SettingsModal />
      <ExportModal />
      <SessionPickerModal />
    </div>
  );
}

export function TranscribeFlowApp() {
  return (
    <AppStateProvider>
      <TranscribeFlowContent />
    </AppStateProvider>
  );
}