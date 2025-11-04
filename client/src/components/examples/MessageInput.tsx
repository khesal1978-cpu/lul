import MessageInput from '../MessageInput';

export default function MessageInputExample() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1" />
      <MessageInput
        onSend={(msg) => console.log('Message sent:', msg)}
      />
    </div>
  );
}
