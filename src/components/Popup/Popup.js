import React, { useCallback, useEffect, useRef} from 'react';
import './popup/popup.css';

const Popup = ({ title, name, onClose, children }) => {
  
  const popup = useRef();
  const smoothClose = useCallback(() => {
    popup.current.classList.remove('popup_is-opened');
    popup.current.addEventListener('transitionend', onClose, true)
  }, [onClose])
  
  useEffect(() => {
    const escFunction = ({keyCode}) => {
      if(keyCode === 27) {
        smoothClose();
      }
    }
    const hadleOverlayClick = ({target})=>{
      if(target.classList.contains('popup')){
        smoothClose();
      }
    }
    popup.current.classList.add('popup_is-opened')
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", hadleOverlayClick);
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", hadleOverlayClick);
      
    };
  }, [smoothClose]);

  return (
    <>
    <div ref={popup} className='popup'>
      <div className={`popup__content popup_type_${name} `}>
        <button 
        type='button' 
        className='popup__close'
        onClick={smoothClose}
        ></button>
        {title && <h3 className='popup__title'>{title}</h3>}
        {children}
      </div>
    </div>
  </>
  )
}

export default Popup;
