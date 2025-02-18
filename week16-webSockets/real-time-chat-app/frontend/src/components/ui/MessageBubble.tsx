const getUserColor = (userId: any) => {
  // Create a consistent color based on userId
  const colors = [
    'text-pink-500',
    'text-purple-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-orange-500',
    'text-red-500',
    'text-teal-500'
  ];
  
  // Hash the userId to get a consistent index
  const hash = userId.split('').reduce((acc: any, char: any) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

const MessageBubble = ({ message, userData }: {message : any , userData: any}) => {
  const isOwnMessage = message.sender._id === userData?._id;
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-xs md:max-w-md lg:max-w-lg
          p-4
          rounded-2xl
          shadow-sm
          break-words
          text-sm md:text-base
          ${isOwnMessage ? 
            'bg-blue-600 rounded-tr-none' : 
            'bg-neutral-800 rounded-tl-none'
          }
          transition-all
          hover:shadow-md
        `}
      >
        {!isOwnMessage && (
          <div className={`font-medium mb-1 ${getUserColor(message.sender._id)}`}>
            {message.sender.username}
          </div>
        )}
        
        <div className="text-white">{message.text}</div>
        
        <div className="text-[10px] mt-2 opacity-70 text-gray-200">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;