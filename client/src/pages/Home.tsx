import { useState } from 'react';
import AvatarPanel from '@/components/AvatarPanel';
import ChatInterface from '@/components/ChatInterface';
import MessageInput from '@/components/MessageInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setAvatarStatus('thinking');

    try {
      // Get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI tutor');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      setAvatarStatus('speaking');

      // Generate and play TTS audio
      try {
        const ttsResponse = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: data.response }),
        });

        if (ttsResponse.ok) {
          const audioBlob = await ttsResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          // When audio ends, set avatar back to idle
          audio.onended = () => {
            setAvatarStatus('idle');
            URL.revokeObjectURL(audioUrl); // Clean up
          };

          // If audio fails to play, fallback to timer
          audio.onerror = () => {
            console.error('Error playing audio');
            setTimeout(() => {
              setAvatarStatus('idle');
            }, Math.min(data.response.length * 50, 10000));
            URL.revokeObjectURL(audioUrl);
          };

          // Play the audio
          await audio.play();
        } else {
          // TTS failed, use fallback timer
          console.warn('TTS generation failed, using fallback timer');
          setTimeout(() => {
            setAvatarStatus('idle');
          }, Math.min(data.response.length * 50, 10000));
        }
      } catch (ttsError) {
        console.error('TTS error:', ttsError);
        // Fallback to timer-based animation
        setTimeout(() => {
          setAvatarStatus('idle');
        }, Math.min(data.response.length * 50, 10000));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      setAvatarStatus('idle');
    }
  };

  const handleTopicClick = (topic: string) => {
    handleSendMessage(topic);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden lg:block w-2/5 border-r border-border">
        <AvatarPanel status={avatarStatus} modelPath="/models/shizuku/shizuku.model.json" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="lg:hidden border-b border-border">
          <div className="h-64">
            <AvatarPanel status={avatarStatus} modelPath="/models/shizuku/shizuku.model.json" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            onTopicClick={handleTopicClick}
          />
        </div>

        <MessageInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
