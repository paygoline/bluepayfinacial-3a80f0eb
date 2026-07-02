import { Loader2 } from 'lucide-react';

interface LoaderProps {
  label?: string;
  fullscreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => (
  <Loader2 className={`${sizeMap[size]} animate-spin text-purple-600`} />
);

export const Loader = ({ label = 'Loading...', fullscreen = false, size = 'lg' }: LoaderProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div className={`${sizeMap[size]} rounded-full border-4 border-purple-200`} />
        <div className={`${sizeMap[size]} absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin`} />
      </div>
      {label && <p className="text-sm font-medium text-gray-700 animate-pulse">{label}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[100]">
        {content}
      </div>
    );
  }
  return content;
};

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 p-4 space-y-4">
    <div className="h-32 bg-gradient-to-br from-purple-300/40 to-purple-400/40 rounded-2xl animate-pulse" />
    <div className="h-40 bg-white/60 rounded-2xl animate-pulse" />
    <div className="grid grid-cols-4 gap-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-20 bg-white/60 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
      ))}
    </div>
    <div className="h-52 bg-white/60 rounded-2xl animate-pulse" />
  </div>
);

export default Loader;
