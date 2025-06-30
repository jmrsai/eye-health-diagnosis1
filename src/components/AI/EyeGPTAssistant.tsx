import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send, 
  Brain, 
  FileText, 
  TrendingUp,
  Stethoscope,
  Eye,
  Zap,
  Volume2,
  VolumeX,
  Copy,
  Download,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: string[];
    actionable?: boolean;
  };
}

interface ClinicalContext {
  patientId: string;
  currentExam: string;
  recentFindings: string[];
  medications: string[];
  history: string[];
}

export default function EyeGPTAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'EyeGPT Assistant activated. I can help with clinical documentation, decision support, and patient communication. How can I assist you today?',
      timestamp: new Date(),
      metadata: { confidence: 100 }
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [clinicalMode, setClinicalMode] = useState<'scribe' | 'query' | 'decision' | 'patient'>('scribe');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const mockClinicalContext: ClinicalContext = {
    patientId: 'P001',
    currentExam: 'Comprehensive Eye Exam',
    recentFindings: ['IOP: 18 mmHg OD, 16 mmHg OS', 'Visual Acuity: 20/25 OU', 'Mild nuclear sclerosis'],
    medications: ['Latanoprost 0.005% OU QHS', 'Artificial tears PRN'],
    history: ['Glaucoma suspect', 'Diabetes Type 2', 'Hypertension']
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = generateAIResponse(inputText, clinicalMode);
    setMessages(prev => [...prev, aiResponse]);
    setIsProcessing(false);

    // Text-to-speech for AI responses
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(aiResponse.content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const generateAIResponse = (input: string, mode: string): Message => {
    const responses = {
      scribe: {
        'patient complains of blurred vision': {
          content: `**Clinical Note Generated:**

**Chief Complaint:** Patient reports blurred vision

**History of Present Illness:** 
- Onset: [Duration needed]
- Quality: Blurred vision
- Associated symptoms: [To be clarified]
- Aggravating/alleviating factors: [To be assessed]

**Suggested Follow-up Questions:**
1. When did the blurred vision start?
2. Is it constant or intermittent?
3. Does it affect near, distance, or both?
4. Any associated pain, flashing lights, or floaters?

**Recommended Tests:**
- Visual acuity assessment
- Refraction
- Dilated fundus examination`,
          confidence: 95,
          sources: ['Clinical Documentation Guidelines', 'AAO Preferred Practice Patterns']
        }
      },
      query: {
        'show iop trends': {
          content: `**IOP Trend Analysis for Patient P001:**

**Current Values:** 18 mmHg OD, 16 mmHg OS
**6-Month Trend:** Stable (±2 mmHg variation)
**Treatment Response:** Good control on Latanoprost

**Key Observations:**
- IOP within target range (<18 mmHg)
- No significant diurnal variation noted
- Medication compliance appears good

**Recommendations:**
- Continue current therapy
- Next IOP check in 3 months
- Consider 24-hour IOP monitoring if progression concerns`,
          confidence: 98,
          sources: ['Patient EMR Data', 'Glaucoma Management Guidelines']
        }
      },
      decision: {
        'treatment options for glaucoma': {
          content: `**Evidence-Based Treatment Recommendations:**

**First-Line Options:**
1. **Prostaglandin Analogs** (Current: Latanoprost)
   - Efficacy: 25-30% IOP reduction
   - Side effects: Iris pigmentation, lash growth
   - Dosing: Once daily

2. **Beta-Blockers** (Alternative/Adjunctive)
   - Efficacy: 20-25% IOP reduction
   - Contraindications: Asthma, COPD, heart block
   - Examples: Timolol, Betaxolol

**Combination Therapy:**
- Consider if monotherapy insufficient
- Fixed combinations improve compliance

**Surgical Options:**
- SLT: 20-30% IOP reduction, repeatable
- Trabeculectomy: 30-40% reduction, higher risk
- MIGS: Moderate reduction, lower risk

**Patient-Specific Factors:**
- Age: 58 (good surgical candidate)
- Diabetes: Monitor for retinopathy progression
- Current control: Good, continue monitoring`,
          confidence: 92,
          sources: ['AAO Glaucoma Guidelines', 'Cochrane Reviews', 'Recent Clinical Trials']
        }
      },
      patient: {
        'explain glaucoma': {
          content: `**Patient-Friendly Explanation:**

**What is Glaucoma?**
Think of glaucoma as a "silent thief of sight." It's a condition where the pressure inside your eye gradually damages the optic nerve - the cable that connects your eye to your brain.

**Why Does This Happen?**
Your eye constantly makes a clear fluid. If this fluid doesn't drain properly, pressure builds up, like air in a balloon.

**The Good News:**
- We caught it early through regular eye exams
- Your current eye drops are working well
- With proper treatment, most people keep their vision

**Your Treatment:**
- Eye drops once daily (like brushing your teeth)
- Regular check-ups every 3-4 months
- Healthy lifestyle helps too

**Questions to Ask:**
- "How often should I use my drops?"
- "What side effects should I watch for?"
- "When is my next appointment?"

Would you like me to create a personalized care plan for you?`,
          confidence: 96,
          sources: ['Patient Education Materials', 'Health Literacy Guidelines']
        }
      }
    };

    const modeResponses = responses[mode as keyof typeof responses];
    const matchedResponse = Object.entries(modeResponses).find(([key]) => 
      input.toLowerCase().includes(key.toLowerCase())
    );

    if (matchedResponse) {
      const [, response] = matchedResponse;
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        metadata: {
          confidence: response.confidence,
          sources: response.sources,
          actionable: true
        }
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I understand you're asking about "${input}". Let me analyze this in the context of ${mode} mode. Based on the current patient data and clinical guidelines, I can provide specific recommendations. Would you like me to elaborate on any particular aspect?`,
      timestamp: new Date(),
      metadata: {
        confidence: 85,
        sources: ['Clinical Knowledge Base'],
        actionable: true
      }
    };
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      recognition.current?.start();
      setIsListening(true);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const exportConversation = () => {
    const conversation = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.type.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eyegpt-conversation-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-primary-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              EyeGPT Assistant
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-Powered Clinical Co-pilot
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled 
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20' 
                : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
            }`}
          >
            {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={exportConversation}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center space-x-1 p-4 bg-gray-50 dark:bg-gray-700">
        {[
          { id: 'scribe', name: 'AI Scribe', icon: FileText, desc: 'Auto-generate clinical notes' },
          { id: 'query', name: 'Data Query', icon: TrendingUp, desc: 'Ask about patient data' },
          { id: 'decision', name: 'Decision Support', icon: Stethoscope, desc: 'Treatment recommendations' },
          { id: 'patient', name: 'Patient Education', icon: Eye, desc: 'Patient-friendly explanations' }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setClinicalMode(mode.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              clinicalMode === mode.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
            }`}
            title={mode.desc}
          >
            <mode.icon className="h-4 w-4" />
            <span className="hidden md:block">{mode.name}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary-500 text-white' 
                      : message.type === 'system'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}>
                    {message.type === 'user' ? (
                      <Stethoscope className="h-4 w-4" />
                    ) : message.type === 'system' ? (
                      <Zap className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white'
                        : message.type === 'system'
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return (
                              <h4 key={index} className="font-semibold mt-3 mb-1 first:mt-0">
                                {line.replace(/\*\*/g, '')}
                              </h4>
                            );
                          }
                          if (line.startsWith('- ') || line.match(/^\d+\./)) {
                            return (
                              <div key={index} className="ml-4 mb-1">
                                {line}
                              </div>
                            );
                          }
                          return line ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
                        })}
                      </div>
                      
                      {message.metadata && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              {message.metadata.confidence && (
                                <span className={`px-2 py-1 rounded-full ${
                                  message.metadata.confidence > 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                  message.metadata.confidence > 80 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                  {message.metadata.confidence}% confidence
                                </span>
                              )}
                              {message.metadata.sources && (
                                <span className="text-gray-500 dark:text-gray-400">
                                  Sources: {message.metadata.sources.length}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => copyToClipboard(message.content)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    EyeGPT is thinking...
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask EyeGPT in ${clinicalMode.replace('_', ' ')} mode...`}
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isProcessing}
            />
            <button
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isProcessing}
            className="p-3 bg-gradient-to-r from-primary-500 to-medical-500 hover:from-primary-600 hover:to-medical-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">Quick actions:</span>
          {[
            'Generate clinical note',
            'Show IOP trends',
            'Treatment options',
            'Explain to patient'
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => setInputText(action)}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}