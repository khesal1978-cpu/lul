import { Button } from '@/components/ui/button';

interface QuickTopicButtonProps {
  topic: string;
  onClick: () => void;
}

export default function QuickTopicButton({ topic, onClick }: QuickTopicButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-sm whitespace-nowrap"
      data-testid={`button-topic-${topic.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {topic}
    </Button>
  );
}
