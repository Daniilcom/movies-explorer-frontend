import React from 'react'
import './AboutMe.css'
import Me from '../../../images/me.svg'

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h1 className="about-me__title">Студент</h1>
      <div className="about-me__container">
        <div className="about-me__section">
          <h2 className="about-me__name">Даниил</h2>
          <p className="about-me__profession">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__description">
            Я родился в городе Чайковский Перского края, но живу сейчас в
            Санкт-Петербурге - тут я закончил Горный университет. Работаю
            координатором крупного рекламного проекта. Я увлекаюсь графическим
            дизайном, люблю слушать музыку и веду активный образ жизни.
            Самостоятельно изучал фронтенд-разработку, а позже приступил к
            прохождению курса по данному направлению от Яндекс.Практикум, после
            обучения стал заниматься фриланс-заказами и ушёл с постоянной
            работы.
          </p>
          <a
            className="about-me__git"
            href="https://github.com/Daniilcom"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="about-me__section">
          <img className="about-me__img" src={Me} alt="Даниил Каменских" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe
