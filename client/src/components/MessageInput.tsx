import { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4">
      <div className="max-w-3xl mx-auto flex gap-2 items-end">
        <Button
          size="icon"
          variant="ghost"
          className="flex-shrink-0"
          data-testid="button-voice"
          onClick={() => console.log('Voice input activated')}
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about Math, Physics, Chemistry..."
          className="resize-none min-h-[48px] max-h-32"
          rows={1}
          disabled={disabled}
          data-testid="input-message"
        />

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="flex-shrink-0"
          data-testid="button-send"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      {message.length > 0 && (
        <div className="text-xs text-muted-foreground text-right mt-1 max-w-3xl mx-auto">
          {message.length} characters
        </div>
      )}
    </div>
  );
}
