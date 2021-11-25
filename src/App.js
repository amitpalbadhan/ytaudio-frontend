import React, { Component } from 'react';
const axios = require('axios');
const fileDownload = require('js-file-download');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMP3 = this.handleMP3.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.value.length < 11) return;
    let re = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const id = re.exec(this.state.value)['1'];

    axios.get(`https://dl.amitpalbadhan.repl.co/api?id=${id}&format=wav`, {responseType: 'blob'})
    .then((response) => {
      fileDownload(response.data, id + '.wav');
    });


    event.preventDefault();
  }

  handleMP3(event) {
    if (this.state.value.length < 11) return;
    let re = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const id = re.exec(this.state.value)['1'];

    axios.get(`https://dl.amitpalbadhan.repl.co/api?id=${id}&format=mp3`, {responseType: 'blob'})
    .then((response) => {
      fileDownload(response.data, id + '.mp3');
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div className="divide-y divide-gray-200">
                  <form onSubmit={this.handleSubmit}>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="max-w-smoverflow-hidden p-6 space-y-10">
                        <h2 className="text-2xl font-bold text-center">YouTube to MP3+WAV</h2>
                        <div className="outline relative border-2 focus-within:border-cyan-400">
                          <input type="text" name="video" value={this.state.value} onChange={this.handleChange} placeholder=" " className="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                          <label className="absolute top-0 text-lg bg-white p-4 -z-1 duration-300 origin-0">Video</label>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 flex justify-evenly">
                      <button type="button" onClick={this.handleMP3} className="bg-gradient-to-r from-sky-400 to-cyan-400 shadow-lg hover:bg-gray-400 text-gray-200 font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                        <span>MP3</span>
                      </button>
                      <button className="bg-gradient-to-r from-cyan-400 to-sky-400 shadow-lg hover:bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                        <span>WAV</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
