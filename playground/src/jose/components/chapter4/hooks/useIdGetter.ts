import { useLocation } from 'react-router-dom';

export default function useIdGetter() {
  const { pathname } = useLocation();
  try {
    const pathArray = pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new Error('NaN Error!');
    return { id: parsedId };
  } catch (error: any) {
    throw new Error(error);
  }
}
