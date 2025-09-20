import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

interface FileUploaderProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  onFilesChange: (files: FileUploadItem[]) => void;
  value?: FileUploadItem[];
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg']
  },
  maxSize = 15 * 1024 * 1024, // 15MB
  maxFiles = 1,
  multiple = false,
  onFilesChange,
  value = [],
  label,
  description,
  required = false,
  error,
  className
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<FileUploadItem[]>(value);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileUploadItem[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    const allFiles = multiple ? [...uploadingFiles, ...newFiles] : newFiles;
    const limitedFiles = allFiles.slice(0, maxFiles);
    
    setUploadingFiles(limitedFiles);

    // Simulate upload progress
    newFiles.forEach(fileItem => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setUploadingFiles(prev => 
            prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, progress: 100, status: 'completed', url: URL.createObjectURL(f.file) }
                : f
            )
          );
        } else {
          setUploadingFiles(prev => 
            prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, progress }
                : f
            )
          );
        }
      }, 200);
    });

    onFilesChange(limitedFiles);
  }, [uploadingFiles, multiple, maxFiles, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: !multiple && uploadingFiles.length >= maxFiles
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadingFiles.filter(f => f.id !== fileId);
    setUploadingFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const acceptedExtensions = Object.values(accept).flat().join(', ');

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          {
            "border-primary bg-primary/5": isDragActive,
            "border-muted-foreground/25 hover:border-primary/50": !isDragActive,
            "cursor-not-allowed opacity-50": !multiple && uploadingFiles.length >= maxFiles
          }
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">
          {isDragActive ? "Drop files here" : "Click to upload or drag and drop"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {acceptedExtensions} up to {formatFileSize(maxSize)}
          {multiple && ` (max ${maxFiles} files)`}
        </p>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((fileItem) => (
            <Card key={fileItem.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {fileItem.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(fileItem.file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {fileItem.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileItem.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {fileItem.status === 'uploading' && (
                  <div className="mt-2">
                    <Progress value={fileItem.progress} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};