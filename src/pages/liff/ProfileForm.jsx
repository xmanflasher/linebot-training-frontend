// src/pages/liff/ProfileForm.jsx
import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    userId: '', // LINE LIFF 初始化後取得
    name: '',
    gender: '男',
    position: '左',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await setDoc(doc(db, 'members', profile.userId), profile);
      alert('儲存成功！');
    } catch (error) {
      console.error('儲存失敗:', error);
      alert('儲存失敗，請稍後再試');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">設定個人資料</h2>

          <Input
            name="userId"
            value={profile.userId}
            onChange={handleChange}
            placeholder="LINE User ID（開發中自動帶入）"
          />
          <Input
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
            placeholder="全名"
          />
          <div>
            <Label>性別</Label>
            <RadioGroup
              value={profile.gender}
              onValueChange={(val) => handleRadioChange('gender', val)}
            >
              <RadioGroupItem value="男" label="男" />
              <RadioGroupItem value="女" label="女" />
              <RadioGroupItem value="其他" label="其他" />
            </RadioGroup>
          </div>

          <div>
            <Label>預設位置</Label>
            <RadioGroup
              value={profile.position}
              onValueChange={(val) => handleRadioChange('position', val)}
            >
              <RadioGroupItem value="左" label="左" />
              <RadioGroupItem value="右" label="右" />
              <RadioGroupItem value="砝碼" label="砝碼" />
              <RadioGroupItem value="舵" label="舵" />
              <RadioGroupItem value="龍頭" label="龍頭" />
            </RadioGroup>
          </div>

          <Button onClick={handleSubmit}>儲存</Button>
        </CardContent>
      </Card>
    </div>
  );
}
