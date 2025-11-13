// src/app/auth/action/page.tsx
import React, { Suspense } from 'react';
import ActionContent from './ActionContent';  // Move your hook logic here

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ActionContent />
    </Suspense>
  );
}
