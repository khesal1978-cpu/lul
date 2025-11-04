import QuickTopicButton from '../QuickTopicButton';

export default function QuickTopicButtonExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <QuickTopicButton 
        topic="Explain quadratic equations" 
        onClick={() => console.log('Topic clicked')} 
      />
      <QuickTopicButton 
        topic="What is Newton's law?" 
        onClick={() => console.log('Topic clicked')} 
      />
      <QuickTopicButton 
        topic="How does photosynthesis work?" 
        onClick={() => console.log('Topic clicked')} 
      />
    </div>
  );
}
