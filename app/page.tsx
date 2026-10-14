import { Suspense } from 'react';
import Invitation from '@/components/Invitation';

// Contoh: https://domain-anda.com/?to=Nama%20Tamu
export default function Page() {
  return (
    <Suspense fallback={<div className="loading-screen">Memuat undangan...</div>}>
      <Invitation />
    </Suspense>
  );
}
