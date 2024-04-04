<template>
    <section class="vh-100" style="background-color: #508bfc;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h3 class="mb-5">Login</h3>
              <form @submit.prevent="guardar">
                <div class="form-outline mb-4">
                    <input type="text" v-model="username" name="username" id="username" class="form-control form-control-lg" placeholder="Correo" />
                </div>

                <div class="form-outline mb-4 text-left">
                    <input type="password" v-model="password" name="password" id="password"class="form-control form-control-lg" placeholder="Contraseña"/>
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    guardar() {
      axios.post('http://localhost:8083/2fa/users', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        // Manejar el error si la llamada a la API falla
        console.error('Error al realizar la solicitud:', error);
      });
    }
  }
}
</script>