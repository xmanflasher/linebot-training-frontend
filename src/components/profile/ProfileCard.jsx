// src/components/ProfileCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function ProfileCard({ profile, anchorRect, onClose }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    if (!anchorRect) return;

    const cardWidth = 180;
    const spacing = 8;
    const screenWidth = window.innerWidth;

    let left = anchorRect.right + spacing;
    let showLeft = false;

    if (anchorRect.right + spacing + cardWidth > screenWidth) {
      if (anchorRect.left - spacing - cardWidth > 0) {
        left = anchorRect.left - spacing - cardWidth;
        showLeft = true;
      } else {
        left = screenWidth - cardWidth - spacing;
      }
    }

    const top = anchorRect.top + window.scrollY;
    setPosition({ top, left });
  }, [anchorRect]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const card = (
    <div
      ref={cardRef}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
      }}
      className="w-[180px] bg-white rounded-lg shadow-md border p-3 text-sm"
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-gray-400 text-xs"
      >
        ✕
      </button>
      <div className="flex items-center gap-2">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-full text-base">
            {profile.userId?.[0] || '?'}
          </div>
        )}
        <div>
          <div className="font-semibold truncate">{profile.userId}（{profile.name}）</div>
          <div className="text-gray-600">{profile.gender}・{profile.character}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(card, document.body);
}
