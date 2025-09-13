"use client";

import React from "react";
import BannerManager from "./BannerManager";

export default function DashboardBanner() {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ marginBottom: 12 }}>Banner Videos</h2>
      <BannerManager />
    </div>
  );
}