import React from 'react';
import Contacto from './Contacto';

const Descripcion = ({ children }) => {
  return (
    <div>
      <p>
        Instructores y administrativos. Queremos que se sientan acogidos y
        respaldados en cada paso de su trayectoria con nosotros. Aquí
        encontrarán nuestro completo portafolio de servicios, diseñado para
        apoyar y enriquecer su experiencia. Con una amplia gama de opciones. Nos
        esforzamos en proporcionar un ambiente constructivo y estimulante para
        todos nuestros miembros. Este es un recurso esencial que los
        instructores pueden utilizar para ayudar a los aprendices que detecten
        que puedan estar necesitando apoyo adicional. Ya sea que necesiten
        orientación académica, asesoramiento personal o simplemente alguien con
        quien hablar, estamos aquí para ayudar. Esperamos que esta página sea un
        punto de partida útil para explorar todo lo que tenemos para ofrecer.
        Estamos comprometidos con su éxito y bienestar, y esperamos poder
        contribuir a su experiencia positiva en el Centro de Procesos
        Industriales y Construcción del SENA. ¡Bienvenidos a nuestra comunidad!
      </p>
      <Contacto />
      {children}
    </div>
  );
};

export default Descripcion;
