import React from 'react'
import './AboutProject.css'

const AboutProject = () => {
  return (
    <section className="project" id="about-project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__conteiner-1">
        <div className="project__description-1">
          <h3 className="project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__description-2">
          <h3 className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__conteiner-2">
        <div className="project__timelapse-1">
          <p className="project__timelapse-text">1 неделя</p>
        </div>
        <div className="project__timelapse-2">
          <p className="project__timelapse-text">4 недели</p>
        </div>
        <div className="project__stage">
          <p className="project__stage-text">Back-end</p>
        </div>
        <div className="project__stage">
          <p className="project__stage-text">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
