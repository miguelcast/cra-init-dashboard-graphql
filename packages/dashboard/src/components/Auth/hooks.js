import { useState, useEffect } from 'react';
import { observableLoggedIn } from '../../config/client';

export function useAuthenticated() {
  const { data } = observableLoggedIn.getCurrentResult();

  const [auth, setAuth] = useState({
    isAuthenticated: data.userLogged.isLoggedIn || false,
  });

  useEffect(() => {
    const subscribed = observableLoggedIn.subscribe({
      next: ({ data: { userLogged } }) =>
        setAuth({ isAuthenticated: userLogged.isLoggedIn }),
    });
    return () => subscribed._cleanup();
  }, []);

  return { ...(auth || { isAuthenticated: false }) };
}
