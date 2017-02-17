import React, {Component} from 'react';
import Board from './components/Board';
import Repository from './repository/Repository';

class App extends Component {
    constructor({repository = new Repository({appId: 'test'})}) {
        super();
        this.state = {repository};
    }

    componentWillMount() {
        this.state.repository.onChange(repository => this.setState({repository}))
    }

    render() {
        return (
            <div className="App">
                <Board repository={this.state.repository}/>
            </div>
        );
    }
}

export default App;
