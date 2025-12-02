self.onmessage = async (event) => {
  try {
    const file = event.data;
    if (!(file instanceof Blob)) {
      self.postMessage({ error: "Invalid file input" });
      return;
    }

    const bitmap = await createImageBitmap(file);

    const maxSize = 512;
    const ratio = Math.min(maxSize / bitmap.width, maxSize / bitmap.height);
    const width = Math.max(1, Math.floor(bitmap.width * ratio));
    const height = Math.max(1, Math.floor(bitmap.height * ratio));

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      self.postMessage({ error: "Failed to get 2D context" });
      return;
    }

    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.85 });
    self.postMessage({ blob });
  } catch (err) {
    self.postMessage({ error: err instanceof Error ? err.message : String(err) });
  }
};
