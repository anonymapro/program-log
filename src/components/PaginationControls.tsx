
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function PaginationControls({ currentPage, totalPages, baseUrl }: PaginationControlsProps) {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <Button asChild variant="outline" disabled={!hasPreviousPage}>
        <Link href={`${baseUrl}?page=${currentPage - 1}`} scroll={false}>
          <ArrowLeft />
          Précédent
        </Link>
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} sur {totalPages}
      </span>
      <Button asChild variant="outline" disabled={!hasNextPage}>
        <Link href={`${baseUrl}?page=${currentPage + 1}`} scroll={false}>
          Suivant
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
