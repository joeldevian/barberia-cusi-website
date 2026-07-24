'use client';

import { useEffect } from 'react';
import { initAnimations } from '@/lib/animations';

export default function AnimationProvider() {
  useEffect(() => {
    // Initialize animations on mount
    initAnimations();
  }, []);

  return null;
}
