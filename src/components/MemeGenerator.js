import React from 'react';

class MemeGenerator extends React.Component{
    constructor(){
        super();
        this.state = {
            topText:'',
            bottomText:'',
            randomImage:'http://i.imgflip.com/1bij.jpg',
            allMemeImages:[],
            topText:'',
            bottomText:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const randNum = Math.floor(Math.random() * (this.state.allMemeImages.length));
        const randMemeImg = this.state.allMemeImages[randNum].url;
        this.setState({ randomImage: randMemeImg });
        
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemeImages:memes,
                })
            })
    }

    render(){
        return(
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>

                    <input type='text' placeholder='Top text' name='topText' value={this.state.topText} onChange={this.handleChange}/>

                    <input type='text' placeholder='Bottom text' name='bottomText' value={this.state.bottomText} onChange={this.handleChange}/>

                    <button>Gen</button>
                </form>

                <div className='meme'>
                    <img height='500' src={this.state.randomImage} alt=""/>
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator