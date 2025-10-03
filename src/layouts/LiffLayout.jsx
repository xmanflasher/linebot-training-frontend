// src/layouts/LiffLayout.jsx
import React from "react";

//巢狀路由 + <Outlet /> 的寫法
import { Outlet } from "react-router-dom";

export default function LiffLayout({ children }) {
    return (
        <div className="pt-16 pb-14">
            {/* pt-16：避開上方 Toolbar (固定高度 64px)
          pb-14：避開下方 Bottom Toolbar (56px 左右) */}
            {/* {children} */}
            <Outlet />
        </div>
    );
}
