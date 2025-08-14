<template>
    <section 
      class="relative flex flex-col items-center justify-center text-center text-white"
      style="height: 95vh; padding-bottom: 5%;">
      
      <!-- Imagen de fondo con filtro -->
      <div 
        class="absolute inset-0 bg-cover bg-center hero-bg"
        :style="{ backgroundImage: `url('${backgroundImage}')` }">
      </div>
  
      <!-- Contenido -->
      <div class="relative z-10 px-4">
        <!-- <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Bienvenido a Nuestro Sitio
        </h1>
        <p class="text-base sm:text-lg md:text-xl max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
          Esta es una breve descripción que complementa el título y ayuda a captar la atención de los visitantes.
        </p> -->
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "Hero",
    props: {
      backgroundImage: {
        type: String,
        default: "assets/img/Hero/baglioni.jpg"
      }
    }
  };
  </script>
  
  <style scoped>
  .hero-bg {
    background-color: rgba(0, 0, 0, 0.4); /* Oscuridad ajustable */
    background-blend-mode: darken;        /* Filtro que no afecta al texto */
  }
  </style>
  