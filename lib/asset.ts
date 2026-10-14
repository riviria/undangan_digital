// Awalan path untuk file di /public. Isi NEXT_PUBLIC_BASE_PATH bila memakai GitHub Pages (mis. /undangan-digital)
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;
