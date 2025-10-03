// src/services/userService.js  unused!
import { isMock, API_URL } from '../config.ts'; // 注意路徑
import { mockProfiles } from '../mock/mockProfiles.js';

export async function getUserProfileAndRole() {
  if (isMock) {
    // ✅ 固定使用 UID002 對應的 mock 資料（Ray）
    const mockUser = mockProfiles.find((p) => p.id === 'UID002');

    return {
      ...mockUser,
      userId: mockUser.id, // 模擬一組類似 LINE LIFF 的 userId
      name: mockUser.name,         // 預設是 member，你也可以加 query 參數控制
      teamIds: mockUser.teamIds || [],
    };
  }
  // 🟢 正常情況：從 LINE LIFF 取得使用者資料
  const liff = window.liff;
  if (!liff.isLoggedIn()) await liff.login();

  const profile = await liff.getProfile();
  const context = liff.getContext();
  const groupId = context.groupId || 'default';

  const res = await fetch(`${API_URL}/api/users/${profile.userId}?groupId=${groupId}`);
  const userData = await res.json();

  return {
    name: profile.displayName,
    userId: profile.userId,
    role: userData.role || 'member',
    groupId,
  };
}