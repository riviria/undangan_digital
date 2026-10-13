import { Suspense } from 'react';
import Invitation from '@/components/Invitation';

// Contoh tautan tamu: /?to=Bapak%20Budi%20Santoso
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep" />}>
      <Invitation />
    </Suspense>
  );
}
