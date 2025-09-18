import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {children}
      </div>
    </div>
  );
}
