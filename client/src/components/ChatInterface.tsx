import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import QuickTopicButton from './QuickTopicButton';
import { Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading?: boolean;
  onTopicClick: (topic: string) => void;
}

const quickTopics = [
  "Explain quadratic equations",
  "What is Newton's law?",
  "How does photosynthesis work?",
  "Solve: 2x + 5 = 15",
];

export default function ChatInterface({ messages, isLoading, onTopicClick }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="space-y-2">
                <h1 className="font-display text-4xl font-semibold gradient-text">
                  Welcome to AI Tutor
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Ask me anything about Math, Physics, Chemistry, or Biology. I'm here to help you learn!
                </p>
              </div>

              <div className="space-y-3 w-full max-w-md">
                <p className="text-sm font-medium text-foreground">Quick Topics:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {quickTopics.map((topic) => (
                    <QuickTopicButton
                      key={topic}
                      topic={topic}
                      onClick={() => onTopicClick(topic)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}

              {isLoading && (
                <div className="flex gap-4 mb-6" data-testid="loading-indicator">
                  <div className="h-8 w-8 rounded-full bg-chart-1 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-card-border rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
