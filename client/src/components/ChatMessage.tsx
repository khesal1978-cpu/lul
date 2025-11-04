import { GraduationCap, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}
      data-testid={`message-${role}`}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground' : 'bg-chart-1 text-white'}>
          {isUser ? <User className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-card-border text-card-foreground'
          }`}
        >
          <p className="text-base leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1 px-1" data-testid="text-timestamp">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
