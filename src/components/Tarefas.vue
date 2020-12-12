<template>  
  <div class="page-container md-layout-column" v-if="logado">
    <md-toolbar class="md-primary">      
      <span class="md-title">Gerenciamento de Tarefas</span>
      <div class="md-toolbar-section-end">
        Olá {{ this.usuario }}
        <md-button @click="logoff()" >Sair</md-button>
      </div>
    </md-toolbar> 
      <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">             
        <md-card-content>
          <div class="md-layout md-gutter">                        
            <div class="md-layout-item md-small-size-100">
              <md-field >
                <md-datepicker v-model="selectedDate" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="titulo">Título</label>
                <md-input name="titulo" id="titulo" v-model="titulo"/>               
              </md-field>
            </div> 
            <div class="md-layout-item md-small-size-100">
            <md-field>
                <label for="descricao">Descrição</label>
                <md-input name="descricao" id="descricao" v-model="descricao"/>               
              </md-field>
            </div>
          </div>                    
          <div class="error" v-if="error">Informe Todos os dados obrigatorio!</div>
        </md-card-content>  
        <md-card-actions>
          <md-button class="md-raised md-primary" @click="addTarefa">criar tarefa</md-button>
        </md-card-actions>         
        <md-list-item v-for="tarefa in tarefas" :key="tarefa.id">
            <div class="md-list-item-text">
                <span><b>Data: </b>{{ tarefa.data }}<b> Titulo:</b>{{ tarefa.titulo }}</span><br>
                <b>Descrição:</b> {{tarefa.descricao}}
            </div>
            <md-button class="md-accent" v-on:click="removeTarefa(tarefa)">Remover</md-button>
        </md-list-item>                              
      </md-card>     
    </form>
  </div>
  <md-content v-else> 
      <h1>Para acessar está pagina você precisa estar logado no sistema</h1>
      <md-content>
        <md-button class="md-raised md-primary" @click="logoff()">Entrar</md-button>
      </md-content> 
  </md-content>
</template>
<script>
import auth from '../auth';

export default {
  name:"Tarefas",  
  data() {
    return {
      logado: auth.dados.autenticado,    
      usuario: auth.dados.usuario,  
      proximoId : 1,
      titulo : "",
      descricao : "",
      selectedDate : null,
      tarefas: [],
      error: false
    };
  },

  methods: {
    addTarefa() {        
      
        //valida se está ok
        if(this.titulo == "" || this.selectedDate == null){
          this.error = true;                
        }else{
          const dateFormatada = this.convertDate(new Date(this.selectedDate));  
          this.error = false;        
          this.tarefas.push(
            {
              id : this.proximoId++,
              titulo : this.titulo,
              descricao : this.descricao, 
              data : dateFormatada,           
            }
          );              
          this.titulo = "";
          this.descricao = "";
          this.selectedDate = null;     
        }  
        
    },
    convertDate(inputFormat) {
          function pad(s) { return (s < 10) ? '0' + s : s; }
          var d = new Date(inputFormat)
          return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    },
    removeTarefa(tarefa) {
      this.tarefas = this.tarefas.filter(x => x.id !== tarefa.id);
    },

    editaTarefa(tarefa){
      this.titulo = tarefa.titulo;
      this.descricao = tarefa.descricao;
     },

    logoff(){
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>    
  .md-layout {        
    margin-top: 20px;        
    align-items: center;
    justify-content: center;
    position: relative;  
    align-items: center;
    justify-content: center       

  }
  
  .md-layout-item{
    margin-bottom: 20px;
  }
</style>
