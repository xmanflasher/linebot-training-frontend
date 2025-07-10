// src/components/team/TeamForm.jsx
import React from 'react';

export default function TeamForm({ team, onChange, onSubmit, submitText = '提交' }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4">
            <div>
                <label className="block font-bold">團隊名稱</label>
                <input
                    className="border p-2 w-full"
                    type="text"
                    value={team.name}
                    onChange={(e) => onChange({ ...team, name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label className="block font-bold">簡介</label>
                <textarea
                    className="border p-2 w-full"
                    value={team.description}
                    onChange={(e) => onChange({ ...team, description: e.target.value })}
                />
            </div>
            <div>
                <label className="block font-bold">地點</label>
                <input
                    className="border p-2 w-full"
                    type="text"
                    value={team.location}
                    onChange={(e) => onChange({ ...team, location: e.target.value })}
                />
            </div>
            <div>
                <label className="block font-bold">Logo 圖片 URL</label>
                <input
                    className="border p-2 w-full"
                    type="url"
                    value={team.logoUrl}
                    onChange={(e) => onChange({ ...team, logoUrl: e.target.value })}
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                {submitText}
            </button>
        </form>
    );
}
