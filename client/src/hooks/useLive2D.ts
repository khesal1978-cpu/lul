import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

// Polyfill for window.PIXI to ensure pixi-live2d-display can access it
if (typeof window !== 'undefined') {
  (window as any).PIXI = PIXI;
}

interface Live2DConfig {
  width: number;
  height: number;
  modelPath?: string;
}

export function useLive2D(config: Live2DConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initPixi = async () => {
      try {
        // Create Pixi application (v7 API - synchronous initialization)
        // Try to force canvas renderer as fallback
        const app = new PIXI.Application({
          width: config.width,
          height: config.height,
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          forceCanvas: true, // Force canvas renderer instead of WebGL
        });

        appRef.current = app;

        // Clear container and append canvas
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          // In Pixi v7, use app.view instead of app.canvas
          containerRef.current.appendChild(app.view as HTMLCanvasElement);
        }

        // Load Live2D model if path provided
        if (config.modelPath) {
          try {
            // Dynamic import of pixi-live2d-display
            const { Live2DModel } = await import('pixi-live2d-display');
            
            // Load the Live2D model
            const model = await Live2DModel.from(config.modelPath);
            
            // Scale and position the model
            const scaleX = (config.width * 0.8) / model.width;
            const scaleY = (config.height * 0.8) / model.height;
            const scale = Math.min(scaleX, scaleY);
            
            model.scale.set(scale);
            model.position.set(config.width / 2, config.height / 2);
            model.anchor.set(0.5, 0.5);
            
            // Add model to stage
            app.stage.addChild(model as any);
            
            // Start idle animation if available
            if (model.internalModel.motionManager) {
              model.motion('idle');
            }
            
            setIsLoading(false);
          } catch (modelError) {
            console.error('Error loading Live2D model:', modelError);
            setError('Failed to load Live2D model. Please ensure a valid model path is provided.');
            setIsLoading(false);
          }
        } else {
          // No model path provided - show placeholder
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error initializing Pixi:', err);
        setError('Failed to initialize renderer');
        setIsLoading(false);
      }
    };

    initPixi();

    // Cleanup
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, [config.width, config.height, config.modelPath]);

  const startMouthAnimation = () => {
    // Placeholder for mouth animation
    console.log('Starting mouth animation');
  };

  const stopMouthAnimation = () => {
    // Placeholder for stopping mouth animation
    console.log('Stopping mouth animation');
  };

  return {
    containerRef,
    isLoading,
    error,
    startMouthAnimation,
    stopMouthAnimation,
  };
}
