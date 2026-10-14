// Pembatas bergambar gunungan
export default function Ornament() {
  return (
    <div className="mx-auto mb-8 flex max-w-xs items-center gap-4 text-saffron" aria-hidden>
      <span className="h-px flex-1 bg-current opacity-50" />
      <svg viewBox="0 0 40 56" className="h-10 w-7" fill="currentColor">
        <path d="M20 2 C26 14 38 22 38 40 L38 54 L2 54 L2 40 C2 22 14 14 20 2Z" />
        <path d="M14 54 V40 C14 33 26 33 26 40 V54Z" fill="#12163A" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
