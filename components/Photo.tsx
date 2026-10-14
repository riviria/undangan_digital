'use client';
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';

// Menampilkan foto bila ada di /public; bila tidak ada, memakai ilustrasi sebagai gantinya.
export default function Photo({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) return <>{fallback}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={asset(src)} alt={alt} onError={() => setOk(false)} className="h-full w-full object-cover" />;
}
