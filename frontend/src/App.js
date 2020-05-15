import React, { Component } from 'react';
import axios from 'axios';
import { 
  Button, 
  Input,
  FormGroup,
  Label, 
  Form
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

import './app.css';


const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/api',
});

class App extends Component {
  state = {
    newPostContent: '',
    srcAudio: 'http://127.0.0.1:3333/audio/audio-8-20-14.mp3',
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await api.get('/posts');

    this.setState({ posts })
  }

  handlePostDelete = async (id) => {
    await api.delete(`/post/${id}`);
    
    this.setState({ posts: this.state.posts.filter(item => item.id !== id) });
  }

  handleAudioSpeak(audio) {
    this.setState({ srcAudio: `http://127.0.0.1:3333/audio/${audio}` });
    document.getElementById('audio').load();
    document.getElementById('audio').play();
  }

  handlePostSave = async (e) => {
    e.preventDefault();

    const { data: post } = await api.post('/post', { post: this.state.newPostContent })

    this.setState({ 
      posts: [ ...this.state.posts, post],
      newPostContent: ''
    })
  };

  render() {
    return (
      <div className="App">
        <main className="container">
          <section  className="row">
            <div className="col-12 col-md-6">
              <Form onSubmit={ this.handlePostSave }>
                <FormGroup>
                  <Label for="post">Deixa seu comentário</Label>
                  <Input type="textarea" size='100' onChange={ e => this.setState({ newPostContent: e.target.value }) } name="post" id="post" />
                </FormGroup>
                <FormGroup>
                  <Button type='submit' color='primary'><i className="fas fa-plus-square"></i> Cadastrar</Button>
                </FormGroup>
              </Form>
            </div>

            <div className="col-12 col-md-6">
              
                { this.state.posts.map(post => {
                  return (
                    
                    <div className="row" key={post.id}>
                      <div className="col-9">
                        { post.post }
                      </div>
                      <div className="col-3 d-flex justify-content-">
                        <Button className='bnt btn-danger' onClick={() => this.handlePostDelete(post.id) } title="Apagar"><i className="fas fa-trash-alt"></i></Button>
                        <Button className='bnt btn-success' onClick={() => this.handleAudioSpeak(post.audio) } title="Escutar"><i className="fas fa-play-circle"></i></Button>
                      </div>
                    </div>
                  );
                }) }
            </div>
            <audio id="audio">
              <source src={ this.state.srcAudio } type="audio/mp3" id="mp3" />
            </audio>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
