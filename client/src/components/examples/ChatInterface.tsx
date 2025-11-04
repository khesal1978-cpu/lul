import ChatInterface from '../ChatInterface';

const mockMessages = [
  {
    id: '1',
    role: 'user' as const,
    content: 'Can you explain the Pythagorean theorem?',
    timestamp: '2:30 PM',
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. This can be written as: a² + b² = c²',
    timestamp: '2:30 PM',
  },
];

export default function ChatInterfaceExample() {
  return (
    <div className="h-screen">
      <ChatInterface
        messages={mockMessages}
        isLoading={false}
        onTopicClick={(topic) => console.log('Topic clicked:', topic)}
      />
    </div>
  );
}
