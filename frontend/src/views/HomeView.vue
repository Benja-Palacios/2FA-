<template>
  <section class="vh-100" style="background-color: #9a616d">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="login">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219"></i>
                      <span class="h1 fw-bold mb-0">Login</span>
                    </div>
                    <h6 id="error-message" style="color: red"></h6>
                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      Iniciar sesión con tu nombre de usuario
                    </h5>
                    <div class="form-outline mb-4">
                      <input v-model="user.username" type="text" id="form2Example17" :class="{
                    'form-control': true,
                    'form-control-lg': true,
                    'is-invalid': showError,
                  }" />
                      <label class="form-label" for="inputvalidate">Nombre de usuario</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="user.password" type="password" id="form2Example27" :class="{
                    'form-control': true,
                    'form-control-lg': true,
                    'is-invalid': showError,
                  }" />
                      <label class="form-label" for="inputvalidate">Contraseña</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">
                        Continuar
                      </button>
                    </div>

                    <a class="small text-muted" href="#!">¿No te acuerdas de tu contraseña?</a>
                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      ¿No tienes cuenta?
                      <a href="#!" style="color: #393f81">Registrate Ahora</a>
                    </p>
                    <a href="#!" class="small text-muted">Politicas de privacidad</a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { loginError } from "../js/login.js";
import { show_alerta } from "../js/modal-swal.js";
import { errorAPI } from "../js/modal-swal.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      showError: false,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8083/api/qrcode/create", this.user)
        .then((response) => {
          if (Object.is(response.data, "data not found")) {
            this.showError = true;
            loginError();
          } else {
            const qrBase64 = response.data;
            show_alerta("Escanea el QR desde Celular", qrBase64, this.user.username)
              .then((isConfirmed) => {
                if (isConfirmed) {
                  setTimeout(() => {
                    Swal.fire({
                      title: `Bienvenido ${this.user.username}`,
                      icon: "success"
                    });
                    this.$router.push('/about');
                  }, 2000); 
                } else {
                  // La alerta fue cancelada, haz otra cosa en tu vista si es necesario
                }
              })
              .catch((error) => {
                console.error(error);
              });


          }
        })
        .catch((error) => {
          errorAPI("Oops...", "Asegurate que el backend este activado", "error");
          console.error("Error al realizar la solicitud:", error);
        });
    },
  },
};
</script>

<style>
.is-invalid {
  border-color: #dc3545;
}
.swal2-timer-progress-bar{
    background-color: purple !important;
}
</style>
