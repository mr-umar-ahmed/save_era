'use client';
import { useRouter } from 'next/navigation';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonLink({ href, children, className = '' }: ButtonLinkProps) {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.push(href)}
      className={className}
    >
      {children}
    </button>
  );
}
