import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en-US', label: 'English' },
  { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)' },
];

const VoiceInput = ({ onTranscript, placeholder = "Speak or type..." }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const permissionGrantedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;
      
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        console.log('Speech recognition result:', transcriptText, 'isFinal:', event.results[current].isFinal);
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          console.log('Final transcript:', transcriptText);
          onTranscript(transcriptText);
          setTranscript("");
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        let errorMessage = "Could not process voice input. Please try again.";
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          errorMessage = "Microphone access denied. Please allow microphone access in your browser settings.";
        } else if (event.error === 'no-speech') {
          errorMessage = "No speech detected. Please try speaking again.";
        } else if (event.error === 'network') {
          errorMessage = "Network error. Please check your connection.";
        }
        
        toast({
          title: "Voice input error",
          description: errorMessage,
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started successfully');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, toast, selectedLanguage]);

  const requestMicrophonePermission = async () => {
    try {
      console.log('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted');
      stream.getTracks().forEach(track => track.stop());
      permissionGrantedRef.current = true;
      toast({
        title: "Microphone ready",
        description: "You can now use voice input",
      });
      return true;
    } catch (error) {
      console.error('Microphone permission error:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access in your browser settings to use voice input.",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleListening = async () => {
    console.log('Toggle listening clicked');
    
    if (!recognitionRef.current) {
      console.warn('Speech recognition not available');
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      console.log('Stopping speech recognition');
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Request microphone permission if not already granted
      if (!permissionGrantedRef.current) {
        console.log('Requesting microphone permission first time');
        const granted = await requestMicrophonePermission();
        if (!granted) return;
      }
      
      try {
        console.log('Starting speech recognition with language:', selectedLanguage);
        recognitionRef.current.lang = selectedLanguage;
        recognitionRef.current.start();
        setIsListening(true);
        
        const langLabel = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.label || 'English';
        toast({
          title: `🎤 Listening in ${langLabel}...`,
          description: "Speak clearly into your microphone",
        });
      } catch (error: any) {
        console.error('Error starting recognition:', error);
        
        // Handle specific error cases
        if (error.message?.includes('already started')) {
          console.log('Recognition already started, stopping and restarting...');
          recognitionRef.current.stop();
          setTimeout(() => toggleListening(), 100);
          return;
        }
        
        toast({
          title: "Voice input error",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Language Selection */}
      <div className="flex items-center gap-2">
        <Languages className="w-5 h-5 text-muted-foreground" />
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Voice Input */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 relative">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && transcript.trim()) {
                onTranscript(transcript);
                setTranscript("");
              }
            }}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {isListening && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
          )}
        </div>
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          size="lg"
          className="h-12 w-12"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};

export default VoiceInput;
