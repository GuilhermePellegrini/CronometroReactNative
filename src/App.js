import React, { Component } from 'react';
import Cronometro from './assets/cronometro.png';
import './style.css';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
            timer: '00:00:00',
            horas: {
                hora: 0,
                minutos: 0,
                segundos: 0
            },
            btnIniciar: 'Iniciar',
            salvo: [],
            erro: ''
        };

        this.relogio = null;
        this.iniciar = this.iniciar.bind(this);
        this.zerar = this.zerar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.zerarSalvos = this.zerarSalvos.bind(this);
    }

    //Iniciando Cronometro
    iniciar(){

        if(this.relogio !== null){
            clearInterval(this.relogio);
            this.relogio = null;
            this.setState({btnIniciar: 'Iniciar'});
        }else{
            this.setState({btnIniciar: 'Pausar'});
            this.relogio = setInterval(() => {
                let state = this.state;
                state.horas.segundos += 1;
                if(state.horas.segundos === 60){
                    state.horas.segundos = 0;
                    state.horas.minutos += 1;
                    if(state.horas.minutos === 60){
                        state.horas.minutos = 0;
                        state.horas.hora += 1;
                    }
                }
                let hora = state.horas.hora;
                let minutos = state.horas.minutos;
                let segundos = state.horas.segundos;
                if(hora < 10){
                    hora = '0'+state.horas.hora;
                }
                if(minutos < 10){
                    minutos = '0'+state.horas.minutos;
                }
                if(segundos < 10){
                    segundos = '0'+state.horas.segundos;
                }
                state.timer = hora+":"+minutos+":"+segundos;
                this.setState(state);
            },1000)
        }
    }

    zerar(){
        if(this.relogio !== null){
            this.iniciar();
        }
        this.setState({timer: '00:00:00'});
        this.setState({horas: {hora: 0, minutos: 0, segundos: 0}});
    }

    salvar(){
        let time = this.state.timer;
        let tamanho = this.state.salvo.length;
        if(tamanho >= 15){
            this.setState({erro: "Numero maximo de tempos salvos atingido."});
        }else{
            this.setState({salvo: [...this.state.salvo, time]});
        }
    }

    zerarSalvos(){
        this.setState({salvo: []});
        this.setState({erro: ""});
    }

    render(){
        return(
            <div className='container'>
                <div className='erro'>{this.state.erro}</div>
                <img src={Cronometro} alt='cronometro' className='img'/>
                <a className='timer' href>{this.state.timer}</a>
                <div className='areaBtn'>
                    <a className='btn' href onClick={this.iniciar}>{this.state.btnIniciar}</a>
                    <a className='btn' href onClick={this.zerar}>Zerar</a>
                    <a className='btn' href onClick={this.salvar}>Salvar</a>
                </div>
                <div className='salvar'>
                    <b>Salvos</b>
                    {this.state.salvo.map(function(time){
                        return (
                            <div className='salvo'>{time}</div>
                        );
                    })}
                    <a className='btnBlack' href onClick={this.zerarSalvos}>Zerar Salvos</a>
                </div>
            </div>
        );
    }
}

export default App