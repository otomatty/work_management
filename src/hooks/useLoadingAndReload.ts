import { useState } from 'react';

export const useLoadingAndReload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const reloadPage = () => window.location.reload();

  return { isLoading, startLoading, stopLoading, reloadPage };
};
