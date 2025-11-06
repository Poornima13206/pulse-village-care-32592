export interface Voice {
  lang: string;
  name: string;
  voiceURI: string;
}

export const SUPPORTED_LANGUAGES = [
  { code: "en-US", label: "English", voiceName: "Google US English" },
  { code: "hi-IN", label: "Hindi", voiceName: "Google हिन्दी" },
  { code: "kn-IN", label: "Kannada", voiceName: "Google Kannada" },
];

export class TextToSpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
    
    if (this.voices.length === 0) {
      // Chrome loads voices asynchronously
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  private getVoiceForLanguage(langCode: string): SpeechSynthesisVoice | null {
    // Try to find exact match first
    let voice = this.voices.find((v) => v.lang === langCode);
    
    if (!voice) {
      // Try to find language family match (e.g., "en-US" -> "en")
      const langFamily = langCode.split("-")[0];
      voice = this.voices.find((v) => v.lang.startsWith(langFamily));
    }
    
    return voice || null;
  }

  speak(text: string, langCode: string = "en-US"): Promise<void> {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      
      // Try to set a specific voice
      const voice = this.getVoiceForLanguage(langCode);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  isSpeaking(): boolean {
    return this.synth.speaking;
  }
}

// Singleton instance
export const ttsService = new TextToSpeechService();