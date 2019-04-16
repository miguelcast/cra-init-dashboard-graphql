import { useState, useEffect } from 'react';
import { observableLoggedIn } from '../../config/client';

export function useAuthenticated() {
  const { data } = observableLoggedIn.getCurrentResult();

  const [auth, setAuth] = useState({
    isAuthenticated: data.isLoggedIn,
  });

  useEffect(() => {
    const subscribed = observableLoggedIn.subscribe({
      next: ({ data: { isLoggedIn } }) =>
        setAuth({ isAuthenticated: isLoggedIn }),
    });
    return () => subscribed._cleanup();
  }, []);

  return { ...(auth || { isAuthenticated: false }) };
}
