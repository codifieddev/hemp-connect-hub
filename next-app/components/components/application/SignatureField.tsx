import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignatureData {
  typedName: string;
  consent: boolean;
  drawn?: string; // base64 image data
  method: 'typed' | 'drawn';
  timestamp: string;
  ip?: string;
}

interface SignatureFieldProps {
  value?: SignatureData;
  onChange: (signature: SignatureData) => void;
  requiredName?: string;
  consentText: string;
  title?: string;
  error?: string;
  className?: string;
}

export const SignatureField: React.FC<SignatureFieldProps> = ({
  value,
  onChange,
  requiredName,
  consentText,
  title = "Signature",
  error,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [method, setMethod] = useState<'typed' | 'drawn'>(value?.method || 'typed');

  useEffect(() => {
    if (value?.drawn && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = value.drawn;
      }
    }
  }, [value?.drawn]);

  const updateSignature = (updates: Partial<SignatureData>) => {
    const newSignature: SignatureData = {
      typedName: value?.typedName || '',
      consent: value?.consent || false,
      method,
      timestamp: new Date().toISOString(),
      ...updates
    };
    onChange(newSignature);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setHasDrawn(true);
      saveDrawnSignature();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
      updateSignature({ drawn: undefined });
    }
  };

  const saveDrawnSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL();
    updateSignature({ drawn: dataURL, method: 'drawn' });
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const isTypedValid = value?.typedName && 
    (!requiredName || value.typedName.toLowerCase().trim() === requiredName.toLowerCase().trim());

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your signature to complete the application.
        </p>
      </div>

      <Tabs value={method} onValueChange={(value) => setMethod(value as 'typed' | 'drawn')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="typed">Type Name</TabsTrigger>
          <TabsTrigger value="drawn">Draw Signature</TabsTrigger>
        </TabsList>

        <TabsContent value="typed" className="space-y-4">
          <div>
            <Label htmlFor="typedName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="typedName"
              value={value?.typedName || ''}
              onChange={(e) => updateSignature({ typedName: e.target.value, method: 'typed' })}
              placeholder="Type your full name"
              className={cn({
                "border-destructive": requiredName && value?.typedName && !isTypedValid
              })}
            />
            {requiredName && value?.typedName && !isTypedValid && (
              <p className="text-sm text-destructive mt-1">
                Name must match: {requiredName}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="drawn" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Draw Your Signature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={150}
                  className="w-full h-32 cursor-crosshair bg-white rounded"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startDrawing(e);
                  }}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    draw(e);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopDrawing();
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearCanvas}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                {hasDrawn && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={downloadSignature}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="consent"
          checked={value?.consent || false}
          onCheckedChange={(checked) => updateSignature({ consent: !!checked })}
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          {consentText}
        </Label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="text-xs text-muted-foreground">
        Timestamp: {value?.timestamp ? new Date(value.timestamp).toLocaleString() : 'Not signed'}
      </div>
    </div>
  );
};