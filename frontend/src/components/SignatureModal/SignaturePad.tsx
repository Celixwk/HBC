import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

export interface SignaturePadHandle {
  getDataUrl: () => string;
  clear: () => void;
  isEmpty: () => boolean;
}

interface SignaturePadProps {
  className?: string;
}

export const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasDrawnRef = useRef(false);

  useImperativeHandle(ref, () => ({
    getDataUrl: () => canvasRef.current?.toDataURL('image/png') ?? '',
    clear: () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawnRef.current = false;
    },
    isEmpty: () => !hasDrawnRef.current
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to its rendered size for sharp drawing
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    resize();

    const getCtx = () => {
      const ctx = canvas.getContext('2d')!;
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      return ctx;
    };

    const getPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseDown = (e: MouseEvent) => {
      isDrawingRef.current = true;
      hasDrawnRef.current = true;
      const { x, y } = getPos(e);
      const ctx = getCtx();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const { x, y } = getPos(e);
      const ctx = getCtx();
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const onMouseUp = () => { isDrawingRef.current = false; };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      hasDrawnRef.current = true;
      const { x, y } = getPos(e.touches[0]);
      const ctx = getCtx();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const { x, y } = getPos(e.touches[0]);
      const ctx = getCtx();
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const onTouchEnd = () => { isDrawingRef.current = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ touchAction: 'none', cursor: 'crosshair' }}
    />
  );
});

SignaturePad.displayName = 'SignaturePad';
