import StatusIndicator from '../StatusIndicator';

export default function StatusIndicatorExample() {
  return (
    <div className="space-y-4">
      <StatusIndicator status="idle" />
      <StatusIndicator status="listening" />
      <StatusIndicator status="thinking" />
      <StatusIndicator status="speaking" />
    </div>
  );
}
