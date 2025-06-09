// src/components/CircleAvatar.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function CircleAvatar({ member }) {
  // 使用 useDraggable 使 CircleAvatar 可被拖曳
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    //id: member.userId, // 使用 member 的 userId（或任何唯一識別符）作為拖曳的 id
    id: `crewmate-${member.id}`,
    // data: {
    //   originalID: member.id//確保在拖曳時可以識別原始的 member.id
    // }
    data: { originalID: member.id } // 可以傳遞其他數據
    
  });
  //console.log('Draggable id:', `crewmate-${member.id}`);
  // const { attributes, listeners, setNodeRef } = useDraggable({ id: `boat-${index}` });
  // 顯示會員的頭像或首字母
  const display = member.avatar ? (
    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
  ) : (
    <span className="text-white">{member.name?.[0] || member.id?.[0]}</span>
  );

  return (
    <div
      ref={setNodeRef} // 設定 draggable 元素的 ref
      {...listeners} // 將拖曳的事件綁定到這個元素
      {...attributes} // 設定額外的拖曳屬性
      style={{ touchAction: 'none' }} // 避免拖曳衝突
      className={`w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-sm font-semibold ${isDragging ? 'opacity-50' : ''}`}
    >
      {display}
    </div>
  );
}
