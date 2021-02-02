import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Os dois pontos faz a tipagem da variável, any significa qualquer coisa, string , json etc...
  // O colchete indica um array vazio
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas'
  //Criamos o form para lidar com os formulários ligando o app.component
  public form: FormGroup;
  public mode: String = 'list';

  // ctor + tab exibe o construtor, o construtor é chamado sempre que o componente inicia
  // O this tem acesso a todos os métodos e variáveis
  // fb cria uma instância do FormBuilder
  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    this.load()
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add() {
    //Recupera o title
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save()
    this.clear()
    this.changeMode('list');
  }

  clear() {
    this.form.reset()
  }

  /*

  () = HTML > TS
  [] = TS > HTML
  [()] = TS <> HTML

  */

  // Especificamos o todo dentro dos métodos
   remove(todo: Todo) {
     //Captura o indice do todo
     const index = this.todos.indexOf(todo);
     //Faz a verificação de segurança, caso não tenha nenhum todo ele remove da lista
     if (index !== -1) {
       // O método splice faz a deleção do elemento, passamos o index + o number
      this.todos.splice(index, 1)
     }
     this.save()
   }
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save()
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save()
  }
 // Salva os dados no localstorage, devemos nos atentar de colocar em todos os métodos.
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list'
  }

// Faz a permanência dos dados ao atualizar o navegador, devemos colocar o método no construtor
  load() {
    const data = localStorage.getItem('todos');
    if(data) {
      this.todos = JSON.parse(data)
    } else {
      this.todos = []
    }

  }

}
