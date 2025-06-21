export interface Session {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  text: string;
  audioBlob?: Blob;
  tags: string[];
  template?: string;
  metadata?: {
    wordCount: number;
    readingTime: number;
    exportCount: number;
  };
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  startTime: number;
  duration: number;
  audioBlob: Blob | null;
  waveformData: Float32Array;
  audioLevel: number;
  peakLevel: number;
}

export interface TranscriptionState {
  currentText: string;
  isTranscribing: boolean;
  progress: number;
  history: Array<{ text: string; timestamp: number }>;
}

export interface SessionsState {
  current: Session | null;
  list: Session[];
  searchQuery: string;
  filterTags: string[];
}

export interface UIState {
  theme: 'light' | 'dark';
  activePanel: 'recorder' | 'editor' | 'history';
  modals: {
    settings: boolean;
    export: boolean;
    sessionPicker: boolean;
  };
}

export interface Settings {
  transcriptionSpeed: number;
  autoSaveInterval: number;
  audioDeviceId: string;
  exportFormat: 'txt' | 'md' | 'pdf';
  shortcuts: Record<string, string>;
}

export interface AppState {
  recording: RecordingState;
  transcription: TranscriptionState;
  sessions: SessionsState;
  ui: UIState;
  settings: Settings;
}

export interface ExportOptions {
  includeTimestamp: boolean;
  includeMetadata: boolean;
  formatting: 'preserve' | 'strip';
}