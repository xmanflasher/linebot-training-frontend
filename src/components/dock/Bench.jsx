// ✅ src/components/dock/Bench.jsx
import React, { useRef, useState } from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import CircleAvatar from '../profile/CircleAvatar';
import ProfileCard from '../profile/ProfileCard';

export default function Bench({ bench }) {
  //const { attributes, listeners, setNodeRef } = useDraggable({ id: `person-${profile.id}` });
  //const { setNodeRef } = useDroppable({ id: 'shore-left' });

  const [selected, setSelected] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);

  const avatarRefs = useRef([]);

  // 產生對應的 ref 陣列
  if (avatarRefs.current.length !== bench.length) {
    avatarRefs.current = bench.map((_, i) => avatarRefs.current[i] || React.createRef());
  }

  // 點擊時設定選擇的 profile 和位置
  const handleClick = (member, index) => {
    const rect = avatarRefs.current[index].current?.getBoundingClientRect();
    if (rect) {
      setSelected(member);
      setAnchorRect(rect);
    }
  };

  return (
    // <div ref={setNodeRef} className="relative p-4 border rounded-xl bg-yellow-50">
    <div className="relative p-4 border rounded-xl bg-yellow-50">
      <h3 className="text-lg font-bold mb-2">板凳區</h3>
      <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
        {bench.map((member, i) => (
          <div
            key={member.userId || i}
            ref={avatarRefs.current[i]}
            onClick={() => handleClick(member, i)}
            className="cursor-pointer"
          >
            {/* <div ref={setNodeRef} {...listeners} {...attributes}> */}
            <CircleAvatar member={member} />
            {/* </div> */}
          </div>
        ))}
      </div>

      {/* 浮動個人資料卡 */}
      {selected && anchorRect && (
        <ProfileCard
          profile={selected}
          anchorRect={anchorRect}
          onClose={() => {
            setSelected(null);
            setAnchorRect(null);
          }}
        />
      )}
    </div>
  );
}

// import React from 'react';
// import { useDroppable } from '@dnd-kit/core';

// export default function Bench({ bench }) {
//   const { setNodeRef } = useDroppable({ id: 'shore-left' });

//   return (
//     <div ref={setNodeRef} className="p-4 border rounded-xl bg-yellow-50">
//       <h3 className="text-lg font-bold mb-2">板凳區</h3>
//       <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
//         {bench.map((p, i) => (
//           <div
//             key={p.id || i}
//             className="w-10 h-10 rounded-full bg-gray-200 text-center flex items-center justify-center text-sm font-bold border border-gray-400"
//             title={p.name}
//           >
//             {p.avatar ? (
//               <img
//                 src={p.avatar}
//                 alt={p.name}
//                 className="w-full h-full rounded-full object-cover"
//               />
//             ) : (
//               p.name?.charAt(0) || '?' // 顯示名字第一個字或 "?"
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React from 'react';

// export default function Bench({ bench }) {
//   if (!bench.length) return null;

//   return (
//     <div className="p-4 border rounded-xl bg-yellow-50">
//       <h3 className="text-lg font-bold mb-2">板凳區</h3>
//       <ul className="list-disc list-inside">
//         {bench.map((p, i) => (
//           <li key={i}>{p.name} {p.side ? `(${p.side})` : ''}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }