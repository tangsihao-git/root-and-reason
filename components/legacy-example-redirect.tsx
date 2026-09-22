'use client';

import { useEffect } from 'react';

const destinations: Record<string, string> = {
  '#ode-free-decay': '/examples/dynamics/ode-free-decay/',
  '#ode-step-response': '/examples/dynamics/ode-step-response/',
  '#ode-damped-oscillation': '/examples/dynamics/ode-damped-oscillation/',
  '#ode-periodic-input': '/examples/dynamics/ode-periodic-input/',
  '#ode-state-system': '/examples/dynamics/ode-state-system/',
  '#ode-linearization': '/examples/dynamics/ode-linearization/',
  '#laplace-examples': '/examples/dynamics/laplace/',
  '#linear-two-modes': '/examples/dynamics/linear-two-modes/',
  '#state-space-oscillation': '/examples/dynamics/state-space-oscillation/',
};

export function LegacyExampleRedirect() {
  useEffect(() => {
    const destination = destinations[window.location.hash];
    if (destination) window.location.replace(destination);
  }, []);

  return null;
}
