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
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form @submit.prevent="signIn()">
                            <div class="form-group row">
                                <label
                                    for="name"
                                    class="
                                        col-sm-4 col-form-label
                                        text-md-right
                                    "
                                    >Name</label
                                >
                                <div class="col-md-6">
                                    <input
                                        id="name"
                                        type="text"
                                        class="form-control"
                                        v-model="user.name"
                                        autocomplete="off"
                                    />
                                </div>
                            </div>

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
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                $v.user.email.$error,
                                        }"
                                    />
                                    <div
                                        v-if="submitted && !$v.user.email.email"
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
                                        autocomplete="off"
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                !$v.user.password.minLength,
                                        }"
                                    />
                                    <div
                                        v-if="
                                            submitted &&
                                            !$v.user.password.minLength
                                        "
                                        class="invalid-feedback"
                                    >
                                        Password must be minimum 6 characters
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label
                                    for="password_confirm"
                                    class="
                                        col-md-4 col-form-label
                                        text-md-right
                                    "
                                    >Password confirm</label
                                >
                                <div class="col-md-6">
                                    <input
                                        id="password_confirm"
                                        type="password"
                                        class="form-control"
                                        v-model="user.password_confirm"
                                        autocomplete="off"
                                        :class="{
                                            'is-invalid':
                                                submitted &&
                                                !$v.user.password_confirm.sameAsPassword,
                                        }"
                                    />
                                    <div
                                        v-if="
                                            submitted &&
                                            !$v.user.password_confirm.sameAsPassword
                                        "
                                        class="invalid-feedback"
                                    >
                                        Password and Confirm Password should match
                                    </div>
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
                                        S'inscrire
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
    minLength,
    sameAs,
} from "./../../../node_modules/vuelidate/dist/validators.min.js";

import { HTTP } from "./../http-constants";

export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirm: "",
            },
            error: null,
            submitted: false,
            isLoading: false,
        };
    },
    validations: {
        user: {
            name: { required },
            email: { required, email },
            password: { required, minLength: minLength(6) },
            password_confirm: { required, sameAsPassword: sameAs("password") },
        },
    },
    computed: {
        isDisabled() {
            return !this.user.name || !this.user.email || !this.user.password || !this.user.password_confirm;
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
                HTTP.post("api/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                    .then((response) => {
                        if (response.data.success) {
                            window.location.href = "/login";
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
