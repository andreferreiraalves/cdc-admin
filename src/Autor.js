import React, { Component } from 'react';

import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';

class FormularioAutor extends Component {
    constructor() {

        super();
        this.state = { nome: '', email: '', senha: '' };

        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} lable="Nome" />
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} lable="Email" />
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} lable="Senha" />

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>
            </div>
        );
    }
    setNome(event) {
        this.setState({ nome: event.target.value });
    }

    setEmail(event) {

        this.setState({ email: event.target.value });
    }

    setSenha(event) {

        this.setState({ senha: event.target.value });
    }

    enviaForm(event) {
        event.preventDefault();

        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (resposta) {
                this.props.callBackAtualizaListagem(resposta);
                
                console.log("enviado com sucesso");
            }.bind(this),
            error: function (resposta) {
                console.log("erro");
            }
        });
    }
}

class TabelaAutores extends Component {

    render() {
        return (<div>
            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.lista.map((autor) => {
                            return (
                                <tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>

            </table>
        </div>
        );
    }
}

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] };
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        });
    }

    atualizaListagem(novaLista) {
        this.setState({ lista: novaLista });
    }

    render() {
        return (
            <div>
                <FormularioAutor callBackAtualizaListagem={this.atualizaListagem} />
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    };
}