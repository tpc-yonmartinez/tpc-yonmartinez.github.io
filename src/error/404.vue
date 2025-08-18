<template>
    <div class="not-found">
      <h1>Error 404</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFoundPage",
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  .not-found h1 {
    font-size: 3rem;
    color: #ff6b6b;
  }
  .not-found p {
    font-size: 1.5rem;
    margin: 20px 0;
  }
  </style>