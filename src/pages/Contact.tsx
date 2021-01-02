import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './contact.css';

const Contact = () => {
  let history = useHistory();
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  /*
  // your token and chat_id
  const token = ''; 
  const chat_id = ''; 
  */

  let arr: any = {
    'Имя пользователя: ': name,
    'Email:': email,
    'Телефон:': phone,
    'Комментарий:': review,
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    let txt = '';
    for (var prop in arr) {
      txt = txt + `<b>${prop}</b> ${arr[prop]} %0A`;
    }
    // fetch(
    //   `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${txt}`,
    //   {
    //     method: 'POST',
    //   }
    // );
    history.push('/thanks');
  }

  return (
    <div className='wrapper'>
      <div className='container center'>
        <div>
          <h1>Контакты</h1>
          <div className='blockContact'>
            <div id='contact'>
              <div>
                <b>Телефон</b> +38 098 666 8597
              </div>
              <div>
                <b>E-mail</b> info@rencar.ua
              </div>
              <div>
                <b>Skype</b> rentcar_
              </div>
            </div>
            <div id='adress'>
              <div>
                <b className='title'>Наши адреса</b>
                <br />
                <b>Харьков</b> , вулиця Мінська, 49
              </div>
              <div>
                <b>Киев</b> , ул. Эспланадная, 20
              </div>
              <div>
                <b>Одесса</b> , Привокзальная пл., 2
              </div>
            </div>
          </div>
          <div>
            <iframe
              title='map'
              className='map'
              src='https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d10254.221168318338!2d36.22203214570908!3d50.01968994522643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d50.025618099999996!2d36.224132399999995!5e0!3m2!1sru!2sua!4v1589379888412!5m2!1sru!2sua'
              width='100%'
              height='400'
              aria-hidden='false'
            ></iframe>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <h3>Форма обратной связи</h3>

              <div className='form-group'>
                <label htmlFor=''>Введите ваше имя</label>
                <input
                  type='text'
                  className='form-control'
                  id=''
                  name='name'
                  placeholder='Например, Иван'
                  required
                  onChange={(event) => {
                    setName(event.currentTarget.value);
                  }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Введите email</label>
                <input
                  type='text'
                  className='form-control'
                  id=''
                  name='email'
                  placeholder='mail@mail.ru'
                  required
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Номер телефона</label>
                <input
                  type='text'
                  className='form-control'
                  id=''
                  name='phone'
                  placeholder='+38 (000) 7128307'
                  required
                  onChange={(event) => {
                    setPhone(event.currentTarget.value);
                  }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Комментарий</label>
                <textarea
                  className='textarea'
                  id=''
                  name='review'
                  placeholder='Введите текст'
                  required
                  onChange={(event) => {
                    setReview(event.currentTarget.value);
                  }}
                />
              </div>
              <div className='center'>
                <button type='submit' className='btn'>
                  Отправить форму
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
