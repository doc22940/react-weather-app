import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';

const PlaceForm = ({ onAddCardSubmit }) => {
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const handleData = (data) => {    
    onAddCardSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} className='popup__form' noValidate>
      <label className='popup__label'>
        <input
          name='name'
          ref={register({
            required: 'Без адреса прогноз не сделать...',
            minLength: {
              value: 3,
              message: 'Не стесняйся, я найду и точный адрес!',
            },
            maxLength: {
              value: 50,
              message: 'Покороче, пожалуйста',
            },
          })}
          type='text'
          id='place-name'
          className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
          placeholder='По какому адресу нужен прогноз?'
          autoComplete="off"
        />         
          <span className={`popup__error ${errors.name ? 'popup__error_visible':''}`} 
          id='place-name-error'>
            {errors.name && errors.name.message}
          </span>        
      </label>
      <Button variant="contained" type='submit'
        className={`button popup__button ${errors.link || errors.name ? 'popup__button_disabled' : 0}`}>
      Добавить
    </Button>
    </form>
  );
};

export default PlaceForm;
