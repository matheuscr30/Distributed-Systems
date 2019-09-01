<template>
  <v-flex xs12>
    <v-dialog v-model="dialogLogin" width="600" persistent no-click-animation>
      <v-card>
        <v-card-title primary-title class="headline primary white--text">
          Login
        </v-card-title>
        <v-card-text class="pb-0">
          <v-form
            ref="loginForm"
            v-model="validation.validLogin"
            lazy-validation
          >
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="validation.models.username"
                    autocomplete="new-password"
                    tabindex="1"
                    :rules="validation.rules.username"
                    label="Username"
                    required
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="validation.models.password"
                    autocomplete="new-password"
                    tabindex="2"
                    :append-icon="
                      validation.auxiliary.showPassword
                        ? 'visibility-off'
                        : 'visibility'
                    "
                    :type="
                      validation.auxiliary.showPassword ? 'text' : 'password'
                    "
                    label="Password"
                    counter
                    required
                    @keyup.enter="login"
                    @click:append="
                      validation.auxiliary.showPassword = !validation.auxiliary
                        .showPassword
                    "
                  />
                </v-flex>

                <v-row>
                  <v-col>
                    <v-btn
                      tabindex="4"
                      color="primary"
                      @click="changeToRegister"
                    >
                      Register
                    </v-btn>
                  </v-col>
                  <v-col class="text-right">
                    <v-btn
                      tabindex="3"
                      color="success"
                      :disabled="!validation.validLogin"
                      :loading="loadingLogin"
                      @click="login"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogRegister"
      width="700"
      persistent
      no-click-animation
    >
      <v-card>
        <v-card-title class="headline primary white--text">
          Register
        </v-card-title>

        <v-card-text>
          <v-form
            ref="registerForm"
            v-model="validation.validRegister"
            lazy-validation
          >
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="validation.models.username"
                    autocomplete="new-password"
                    :rules="validation.rules.username"
                    :counter="50"
                    prepend-icon="person"
                    label="Username"
                    required
                  />
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="validation.models.password"
                    autocomplete="new-password"
                    :append-icon="
                      validation.auxiliary.showPassword
                        ? 'visibility_off'
                        : 'visibility'
                    "
                    :rules="validation.rules.password"
                    prepend-icon="vpn_key"
                    :type="
                      validation.auxiliary.showPassword ? 'text' : 'password'
                    "
                    label="Password"
                    hint="Password must contain digits, lowercase and uppercase"
                    counter
                    required
                    @click:append="
                      validation.auxiliary.showPassword = !validation.auxiliary
                        .showPassword
                    "
                  />
                </v-flex>

                <v-spacer />

                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="validation.models.confirmPassword"
                    autocomplete="new-password"
                    :append-icon="
                      validation.auxiliary.showPassword
                        ? 'visibility_off'
                        : 'visibility'
                    "
                    :error-messages="passwordMatchError()"
                    :type="
                      validation.auxiliary.showPassword ? 'text' : 'password'
                    "
                    prepend-icon=" "
                    label="Confirm Password"
                    counter
                    required
                    @click:append="
                      validation.auxiliary.showPassword = !validation.auxiliary
                        .showPassword
                    "
                  />
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="validation.models.name"
                    autocomplete="new-password"
                    :rules="validation.rules.name"
                    :counter="50"
                    prepend-icon="create"
                    label="Name"
                  />
                </v-flex>
              </v-layout>

              <v-layout row pt-1>
                Already Have an Account?
              </v-layout>

              <v-layout row wrap>
                <v-flex>
                  <v-btn class="ml-0" color="primary" @click="changeToLogin">
                    Login
                  </v-btn>
                </v-flex>

                <v-flex text-right class="mt-1">
                  <v-btn
                    color="success"
                    :disabled="!validation.validRegister"
                    :loading="loadingRegister"
                    @click="register"
                  >
                    Register
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      dialogLogin: true,
      dialogRegister: false,
      loadingLogin: false,
      loadingRegister: false,
      validation: {
        validLogin: true,
        validRegister: false,
        models: {
          name: '',
          username: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          username: [
            (v) => !!v || 'Username is Required',
            // eslint-disable-next-line
            v => /^[a-zA-Z0-9_.-]*$/.test(v) || 'Username must be valid'
          ],
          name: [
            // eslint-disable-next-line
            v => /^[a-zA-Z\s]*$/.test(v) || 'Name must be valid'
          ],
          password: [
            (v) => !!v || 'Password is Required',
            (v) => (v && v.length >= 8) || 'At least 8 characters',
            // eslint-disable-next-line
            v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) || 'Password must contain digits, lowercase and uppercase'
          ]
        },
        auxiliary: {
          showPassword: false
        }
      }
    }
  },
  methods: {
    clearLoginForm() {
      if (this.$refs.loginForm) this.$refs.loginForm.reset()
    },
    clearRegisterForm() {
      if (this.$refs.registerForm) this.$refs.registerForm.reset()
    },
    changeToLogin() {
      this.dialogRegister = false
      this.clearLoginForm()
      this.dialogLogin = true
    },
    changeToRegister() {
      this.dialogLogin = false
      this.clearRegisterForm()
      this.dialogRegister = true
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        this.loadingLogin = true
        const data = {
          username: this.validation.models.username,
          password: this.validation.models.password
        }

        const res = await this.$store.dispatch('auth/login', data)
        if (res.error) {
          this.$emit('submitted', {
            type: 'login',
            error: true,
            message: res.message
          })
        } else {
          this.$emit('submitted', {
            type: 'login',
            error: false
          })
        }

        this.loadingLogin = false
      }
    },
    passwordMatchError() {
      if (
        this.validation.models.password ===
        this.validation.models.confirmPassword
      ) {
        return ''
      } else {
        return 'Passwords must match'
      }
    },
    async register() {
      if (this.$refs.registerForm.validate()) {
        this.loadingRegister = true

        const data = {
          username: this.validation.models.username,
          password: this.validation.models.password,
          name: this.validation.models.name
        }

        const res = await this.$store.dispatch('users/post', data)

        if (res.error) {
          this.$emit('submitted', {
            type: 'register',
            error: true,
            message: res.message
          })
        } else {
          this.$emit('submitted', {
            type: 'register',
            error: false
          })
        }

        this.loadingRegister = false
      }
    }
  }
}
</script>

<style scoped>
.v-card__text {
  padding-bottom: 0px;
}
</style>
