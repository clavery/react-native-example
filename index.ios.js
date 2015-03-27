'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight
} = React;

var RepoList = require('./components/RepoList.ios');

var TestProject = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      userdata: null,
      repodata: null
    }
  },

  render: function() {
    var body = null;

    if (this.state.repodata) {
      body = (
        <View style={styles.body}>
          <Text>Name: {this.state.userdata.name}</Text>
          <Text>Company: {this.state.userdata.company}</Text>
          <Text>Location: {this.state.userdata.location}</Text>

          <View style={styles.repos}>
            <RepoList repos={this.state.repodata} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputs}>

          <TextInput ref="MyInput" 
            style={styles.searchInput} 
            placeholder='Search for github user' 
            onChange={this._onInputChanged} />

          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this._onPress}>

            <Text style={styles.buttonText}>Go</Text>

          </TouchableHighlight>

        </View>

        {body}
      </View>
    );
  },

  _onInputChanged: function(ev) {
    this.setState({username: ev.nativeEvent.text});
  },

  _onPress: function(ev) {
    fetch("https://api.github.com/users/" + this.state.username)
      .then( (response) => {
        if (response.status !== 200) {
          throw "Whoops";
        }
        return response.json()
      })
      .then( (json) => {
        this.setState({userdata : json});
        return json.repos_url;
      }).then( (url) => {
        fetch(url)
          .then( (response) => response.json())
          .then( (json) => {
            this.setState({repodata : json});
          });
      });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 20
  },
  inputs: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  repos: {
    marginTop: 20
  },
  body: {
    flex: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 2,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

AppRegistry.registerComponent('TestProject', () => TestProject);
