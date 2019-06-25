import React, { Component } from 'react';
import edit from '../../assets/img/edit.png';
import remove from '../../assets/img/remove.png';
import checked from '../../assets/img/checked.png';
import noChecked from '../../assets/img/no-checked.png';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import Service from '../../services';
import { formatDate } from '../../utils';
import Form from './Form';
import './style.scss';
import Button from '../../components/Button';

class ToDo extends Component {
  state = {
    todos: [],
    id: '',
    description: '',
    done: false,
    action: 'add',
    showAlert: false,
    message: '',
    showLoading: false,
  };

  componentDidMount() {
    this.getTodos();
    document.getElementById('description').focus();
  }

  getTodos = async () => {
    this.setState({ showLoading: true });
    try {
      const res = await Service.getList();
      this.setState({ todos: res, showLoading: false });
    } catch (error) {
      this.setState({ message: error, showAlert: true });
    } finally {
      this.setState({ showLoading: false });
    }
  };

  handleAdd = async () => {
    const { description, done, todos } = this.state;

    try {
      const data = {
        description,
        done,
      };

      const res = await Service.addItem(data);

      const newTodos = [...todos, res];
      this.setState({
        todos: newTodos,
        description: '',
        message: 'Registro inserido com sucesso.',
        showAlert: true,
      });
    } catch (error) {
      this.setState({ message: error, showAlert: true });
    }
  };

  onClickEditar = (id) => {
    const { todos } = this.state;
    const todo = todos.find(todo => todo._id === id);
    this.setState({
      action: 'edit',
      description: todo.description,
      done: todo.done,
      id: todo._id,
    });
    document.getElementById('description').focus();
  };

  handleEdit = async () => {
    const { description, done, id } = this.state;
    try {
      const data = {
        description,
        done,
      };

      await Service.editItem(data, id);

      this.setState({
        description: '',
        done: false,
        id: '',
        action: 'add',
        message: 'Registro atualizado com sucesso.',
        showAlert: true,
      });

      this.getTodos();
    } catch (error) {
      this.setState({ message: error, showAlert: true });
    }
  };

  remover = async (id, description) => {
    const { todos } = this.state;
    await Service.removeItem(id);

    this.setState({
      todos: todos.filter(todo => todo._id !== id),
      message: `Registro '${description}' removido com sucesso.`,
      showAlert: true,
    });
  };

  render() {
    const {
      description,
      todos,
      showLoading,
      showAlert,
      done,
      message,
      action,
    } = this.state;

    return (
      <div>
        <Form
          action={action}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          description={description}
          onChangeDescription={e => this.setState({ description: e })}
          done={done}
          onChangeDone={e => this.setState({ done: e })}
        />

        <div className="list-todo">
          {todos
            && todos.length > 0
            && todos.map(todo => (
              <div key={todo._id} className="card">
                <img
                  className="checkbox"
                  src={todo.done ? checked : noChecked}
                  alt="checkbox"
                />

                <div className="desc">
                  <span className="createdAt">
                    {formatDate(todo.createdAt)}
                  </span>
                  <br />
                  <span>{todo.description}</span>
                </div>

                <div className="buttons">
                  <Button
                    onClick={() => this.onClickEditar(todo._id)}
                    label={<img src={edit} alt="editar" />}
                  />

                  <Button
                    onClick={() => this.remover(todo._id, todo.description)
                    }
                    label={<img src={remove} alt="remover" />}
                  />
                </div>
              </div>
            ))}
        </div>

        <Loading open={showLoading} />

        <Alert
          open={showAlert}
          message={message}
          onClick={() => this.setState({ showAlert: false })}
        />
      </div>
    );
  }
}

export default ToDo;
