import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__conteiner">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://github.com/Daniilcom"
              class="footer__text footer__copy"
              target="_blank"
              rel="noreferrer"
            >
              &copy;2023
            </a>
          </li>
          <li className="footer__item footer__moby">
            <a
              href="https://practicum.yandex.ru/"
              class="footer__text"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/"
              class="footer__text"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
