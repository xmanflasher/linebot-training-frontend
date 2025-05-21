// src/services/userService.js
export async function getUserProfileAndRole() {
    const mockMode = true; // ✅ 開啟 mock 模式
    const urlParams = new URLSearchParams(window.location.search);
    const mockRole = urlParams.get('role') || 'member'; // ?role=admin or ?role=member
  
    if (mockMode) {
      return {
        name: mockRole === 'admin' ? '管理員小明' : '一般用戶小美',
        userId: 'MOCK_USER_ID',
        role: mockRole,
        groupId: 'MOCK_GROUP_ID',
      };
    }
  
    // 正常情況：從 LINE liff 取得
    const liff = window.liff;
    if (!liff.isLoggedIn()) await liff.login();
  
    const profile = await liff.getProfile();
    const context = liff.getContext();
    const groupId = context.groupId || 'default';
  
    const res = await fetch(`/api/users/${profile.userId}?groupId=${groupId}`);
    const userData = await res.json();
  
    return {
      name: profile.displayName,
      userId: profile.userId,
      role: userData.role || 'member',
      groupId,
    };
  }
  