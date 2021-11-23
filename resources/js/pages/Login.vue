<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div
                    class="alert alert-danger"
                    role="alert"
                    v-if="error !== null"
                >
                    {{ error }}
                </div>

                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="signIn()">
                            <div class="form-group row">
                                <label
                                    for="email"
                                    class="
                                        col-sm-4 col-form-label
                                        text-md-right
                                    "
                                    >E-Mail Address</label
                                >
                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        type="text"
                                        class="form-control"
                                        v-model="user.email"
                                        required
                                        autofocus
                                        autocomplete="off"
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                $v.user.email.$error,
                                        }"
                                    />
                                    <div
                                        v-if="
                                            submitted && !$v.user.email.required
                                        "
                                        class="invalid-feedback"
                                    >
                                        Le champ e-mail est requis
                                    </div>
                                    <div
                                        v-if="
                                            submitted && !$v.user.email.email
                                        "
                                        class="invalid-feedback"
                                    >
                                        Adresse invalide
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label
                                    for="password"
                                    class="
                                        col-md-4 col-form-label
                                        text-md-right
                                    "
                                    >Password</label
                                >
                                <div class="col-md-6">
                                    <input
                                        id="password"
                                        type="password"
                                        class="form-control"
                                        v-model="user.password"
                                        required
                                        autocomplete="off"
                                    />
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <loading-button
                                        :is-loading="isLoading"
                                        :disabled="isDisabled"
                                        :class="[
                                            {
                                                'opacity-50 cursor-not-allowed':
                                                    isDisabled,
                                            },
                                        ]"
                                        class="btn btn-primary btn-block"
                                    >
                                        Se connecter
                                    </loading-button>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    required,
    email,
} from "./../../../node_modules/vuelidate/dist/validators.min.js";

import { HTTP } from "./../http-constants";

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            error: null,
            submitted: false,
            isLoading: false,
        };
    },
    validations: {
        user: {
            email: { required, email },
            password: { required },
            // password: { required, minLength: minLength(6) },
            // confirmPassword: { required, sameAsPassword: sameAs("password") },
        },
    },
    computed: {
        isDisabled() {
            return !this.user.email || !this.user.password;
        },
    },
    methods: {
        signIn: function () {
            this.submitted = true;
            this.isLoading = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.isLoading = false;
                return;
            }

            HTTP.get("/sanctum/csrf-cookie").then((response) => {
                HTTP.post("api/login", {
                    email: this.user.email,
                    password: this.user.password,
                })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.success) {
                            this.$router.go("/dashboard");
                        } else {
                            this.error = response.data.message;
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            });
        },
    },
    beforeRouteEnter(to, from, next) {
        if (window.Laravel.isLoggedin) {
            return next("dashboard");
        }
        next();
    },
};
</script>

<style scoped>
.is-invalid {
    border: 1px solid red;
}
</style>
