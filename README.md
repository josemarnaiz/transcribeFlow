# TranscribeFlow Professional

## 🚀 Quick Start

1. **Extract the ZIP file** to your desired location
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
TranscribeFlow-Professional/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── transcribeflow/    # TranscribeFlow components
│       ├── app.tsx        # Main application
│       ├── recording-panel.tsx
│       ├── editor-panel.tsx
│       ├── sessions-panel.tsx
│       ├── modals/        # Modal components
│       ├── hooks/         # Custom hooks
│       ├── utils/         # Utility functions
│       └── types.ts       # TypeScript definitions
├── public/                # Static assets
├── styles/                # Additional styles
├── package.json          # Dependencies
└── README.md             # This file
```

## 🎯 Features

- **Voice Recording**: Real-time audio capture with waveform visualization
- **Mock Transcription**: Realistic typing animation for demo purposes
- **Rich Text Editor**: Full formatting support with toolbar
- **Session Management**: Save, search, and organize transcriptions
- **Export Options**: TXT, Markdown, and PDF formats
- **Keyboard Shortcuts**: Power user features
- **Theme Support**: Dark and light modes
- **Auto-save**: Never lose your work

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Space | Start/Stop recording |
| Ctrl+S | Save transcription |
| Ctrl+E | Export menu |
| Ctrl+N | New session |
| Ctrl+O | Open session |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| F2 | Rename session |
| Delete | Delete session |
| Ctrl+, | Settings |

## 🛠️ Customization

### Adding Real Transcription
Replace the mock transcription in `utils/transcription-generator.ts` with your preferred speech-to-text API:
- OpenAI Whisper
- Google Speech-to-Text
- Azure Speech Services
- AssemblyAI

### Styling
- Edit `app/globals.css` for global styles
- Modify CSS variables in `styles.css` for theming
- Update gradient colors in the `:root` selector

### Storage
Currently uses localStorage. To add cloud storage:
1. Implement API endpoints in `app/api/`
2. Update `utils/session-manager.ts`
3. Add authentication as needed

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

Feel free to customize and extend TranscribeFlow Professional for your needs!

## 📄 License

MIT License - Use freely for personal and commercial projects.