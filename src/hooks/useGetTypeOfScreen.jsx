import { useEffect, useState } from 'react';

export const screenTypes = {
  largeType: 'largeType',
  mediumType: 'mediumType',
  smallType: 'smallType'
}

export const useGetTypeOfScreen = () => {
  const [screenType, setScreenType] = useState(screenTypes.mediumType);

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 768) {
        setScreenType(screenTypes.largeType)
      } else if (window.innerWidth > 500 && window.innerWidth < 768) {
        setScreenType(screenTypes.mediumType)
      } else if (window.innerWidth < 500) {
        setScreenType(screenTypes.smallType)
      }
    }
    handleWidth()
    window.addEventListener('resize', handleWidth)

    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, []);

  return screenType
}
