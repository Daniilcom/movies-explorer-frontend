import React from 'react'
import './Portfolio.css'

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__text"
            href="https://daniilcom.github.io/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__text"
            href="https://daniilcom.github.io/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__text"
            href="https://daniilcom.nomoreparties.co/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
