<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">        
        <div class="md-title">Gerenciamento de Tarefas</div>
        <div class="md-body-1">Aplicação utilizando Material Design e Vue</div>
      </div>

      <div class="form">
        <md-field>
          <label>Usuário</label>
          <md-input v-model="login.usuario" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Senha</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>        
        <md-field>
          <md-select v-model="login.country" name="country" id="country" placeholder="Região">            
            <md-option value="brazil">Brazil</md-option>            
            <md-option value="united-states">United States</md-option>
          </md-select>
        </md-field>
        <div class="error" v-if="error">Usuário ou senha inválido!</div>      
      </div>

      <div class="actions md-layout md-alignment-center-space-between">        
        <router-link to="/sigin">Registre-se</router-link>
        <md-button class="md-raised md-primary" @click="auth">Entrar</md-button>
      </div>
    </md-content>
    
  </div>
</template>

<script>
import auth from '../auth';

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      autenticado: false,
      error : false, 
      login: {
        usuario: "",
        password: "",
        country: "",
      }
    };
  },
  methods: {
    auth() {      
      if(this.login.usuario == "admin" && this.login.password == "admin")       
      { 
        auth.dados.autenticado  = true;
        auth.dados.usuario = "admin";
        this.$router.push('/tarefas')
      }else{
        this.error = true;
        auth.dados.autenticado  = false;
      }
    }
  }  
};
</script>

<style lang="scss" scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 70vh;
  margin-top: 60px;
  .title {
    text-align: center;
    margin-bottom: 30px;    
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
}
.error{
  color:red;
}
</style>
