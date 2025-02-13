const ScrollableContainer = ({ children, className = '' }: any) => {
  return (
    <div className={`
      scrollbar-thin
      scrollbar-thumb-neutral-600
      scrollbar-track-neutral-800
      hover:scrollbar-thumb-neutral-500
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ScrollableContainer;