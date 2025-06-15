import React from 'react';
import { Icon } from '@iconify/react';

interface TimelineItem {
  text: string;
  type: 'point' | 'subpoint';
  description?: string;
  subitems?: TimelineItem[];
}

interface TimelineTodoListProps {
  tasks: TimelineItem[];
}

const TimelineTodoList: React.FC<TimelineTodoListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return null;
  }

  const renderTimelineItem = (item: TimelineItem, index: number, isSubitem: boolean = false) => {
    const circleClass = item.type === 'point' 
      ? 'absolute -left-5 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-gray-800 z-10'
      : 'absolute -left-3 top-1 flex items-center justify-center w-2 h-2 rounded-full bg-gray-800 z-10';
    
    const lineOffset = item.type === 'point' ? 'left-[10px]' : 'left-[6px]'; // Adjust line position based on circle size

    return (
      <div key={index} className="relative mb-6">
        {/* Vertical line segment for current item */}
        {index > 0 && (
          <div className={`absolute ${lineOffset} top-0 bottom-[24px] w-0.5 bg-gray-300`}></div>
        )}
        {item.subitems && item.subitems.length > 0 && (
          <div className={`absolute ${lineOffset} top-[24px] bottom-0 w-0.5 bg-gray-300`}></div>
        )}

        <div className="flex items-start">
          <div className={circleClass}></div>
          <div className="ml-4 flex-1">
            <p className="font-semibold text-gray-800">{item.text}</p>
            {item.description && (
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            )}
          </div>
        </div>
        {item.subitems && item.subitems.length > 0 && (
          <div className="ml-8 mt-4">
            {item.subitems.map((subItem, subIndex) => (
              renderTimelineItem(subItem, subIndex, true)
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative pl-6">
      {tasks.map((task, index) => renderTimelineItem(task, index))}
    </div>
  );
};

export default TimelineTodoList;
