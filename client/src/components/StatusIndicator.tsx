interface StatusIndicatorProps {
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const statusConfig = {
    idle: { text: 'Ready to help', color: 'bg-muted-foreground' },
    listening: { text: 'Listening...', color: 'bg-chart-2' },
    thinking: { text: 'Thinking...', color: 'bg-chart-4' },
    speaking: { text: 'Speaking...', color: 'bg-chart-1' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-center gap-2 py-4" data-testid={`status-${status}`}>
      <div className="relative flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${config.color}`} />
        {status === 'speaking' && (
          <div className={`absolute h-2 w-2 rounded-full ${config.color} avatar-pulse`} />
        )}
        <span className="text-sm font-medium text-muted-foreground">
          {config.text}
        </span>
      </div>
    </div>
  );
}
