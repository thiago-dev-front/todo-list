
// Nesse ponto fizemos a tipagem dos dados que serão construídos no app.component.ts
export class Todo {

  constructor(
    public id: Number,
    public title: String,
    public done: Boolean

  ) {
  }
}
