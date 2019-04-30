import React, { Component } from 'react';
import $ from 'jquery';

import InputCustomizado from './components/InputCustomizado';

export class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: 0.0, autorId: 0 };

        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} lable="Título" />
                    <InputCustomizado id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setPreco} lable="Título" />

                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        
                        <select name="autorId" id="autorId">
                            <option value="1">Autor Alberto</option>
                            <option value="2">Autor André</option>
                        </select>
                    </div>

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>
            </div>
        );
    }

    
    enviaForm(event) {
        event.preventDefault();
        console.log('envio do post');
    }

    setTitulo(event) {
        this.setState({ titulo: event.target.value });
    }

    setPreco(event) {
        this.setState({ preco: event.target.value });
    }
}

export class TabelaLivros extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    render() {
        return (
            <div>
                <FormularioLivro />
                <TabelaLivros lista={this.state.lista} />
            </div>
        );
    }

    componentDidMount() {
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/livros',
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        });
    }
}