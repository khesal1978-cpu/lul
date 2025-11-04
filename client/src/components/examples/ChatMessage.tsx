import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 p-6 max-w-3xl">
      <ChatMessage
        role="user"
        content="Can you explain the Pythagorean theorem?"
        timestamp="2:30 PM"
      />
      <ChatMessage
        role="assistant"
        content="The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. This can be written as: a² + b² = c²"
        timestamp="2:30 PM"
      />
      <ChatMessage
        role="user"
        content="Can you give me an example?"
        timestamp="2:31 PM"
      />
    </div>
  );
}
