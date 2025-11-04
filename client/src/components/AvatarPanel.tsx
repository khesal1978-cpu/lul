import { useState } from 'react';
import StatusIndicator from './StatusIndicator';
import Live2DAvatar from './Live2DAvatar';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AvatarPanelProps {
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
  modelPath?: string;
}

export default function AvatarPanel({ status, modelPath }: AvatarPanelProps) {
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="h-full avatar-gradient flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
            AI Tutor
          </h2>
          <p className="text-sm text-muted-foreground">
            Your personal learning companion
          </p>
        </div>

        <div
          className="relative w-full aspect-square bg-card/50 rounded-lg border border-card-border overflow-hidden"
          style={{ maxWidth: '400px', margin: '0 auto' }}
          data-testid="canvas-avatar"
        >
          <Live2DAvatar 
            width={400} 
            height={400} 
            modelPath={modelPath}
            status={status}
          />
        </div>

        <StatusIndicator status={status} />

        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
              data-testid="button-mute"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
              data-testid="slider-volume"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {volume[0]}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
