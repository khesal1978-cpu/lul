import { useEffect } from 'react';
import { useLive2D } from '@/hooks/useLive2D';
import { Loader2 } from 'lucide-react';

interface Live2DAvatarProps {
  width: number;
  height: number;
  modelPath?: string;
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export default function Live2DAvatar({ width, height, modelPath, status }: Live2DAvatarProps) {
  const { containerRef, isLoading, error, startMouthAnimation, stopMouthAnimation } = useLive2D({
    width,
    height,
    modelPath,
  });

  // Trigger mouth animation when speaking
  useEffect(() => {
    if (status === 'speaking') {
      startMouthAnimation();
    } else {
      stopMouthAnimation();
    }
  }, [status, startMouthAnimation, stopMouthAnimation]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" data-testid="live2d-container" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="space-y-2">
            <p className="text-sm text-destructive">{error}</p>
            <p className="text-xs text-muted-foreground">
              To use a Live2D avatar, provide a model path to a .model3.json file
            </p>
          </div>
        </div>
      )}
      
      {!modelPath && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-6xl">🎓</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Live2D model placeholder
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Provide a modelPath prop with a .model3.json file to load a Live2D character
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
