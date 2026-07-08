"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrPage() {
  const [dataUrl, setDataUrl] = useState<string>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const target = `${window.location.origin}/carta`;
    setUrl(target);
    QRCode.toDataURL(target, {
      width: 480,
      margin: 2,
      color: { dark: "#0e0d0b", light: "#fbf6ec" },
    }).then(setDataUrl);
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-paper px-6 py-16 text-ink">
      <p className="text-sm font-medium text-ink/70">Bukasovii — código para mesas</p>
      {dataUrl && (
        <img
          src={dataUrl}
          alt="Código QR que enlaza a la carta digital"
          className="h-64 w-64 rounded-2xl border border-ink/10 bg-white p-4"
        />
      )}
      {url && <p className="text-xs text-ink/50">{url}</p>}
      <p className="max-w-xs text-center text-xs text-ink/50">
        Imprime este código y colócalo en las mesas. Al escanearlo, los
        clientes ven la carta directamente.
      </p>
    </main>
  );
}
