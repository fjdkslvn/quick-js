
import React, { useEffect, useState } from 'react';

const Toast: React.FC<{message:string; onClose: ()=> void}> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 1000); // 3초 후에 토스트 메시지가 사라집니다.

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-sky-300 text-white px-4 py-2 rounded-md shadow-md text-xs">
      {message}
    </div>
  );
};

export default Toast;