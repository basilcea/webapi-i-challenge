import React from "react";
import FriendList from "./Component/friendsList";
import Form from "./Component/form";
import styled from 'styled-components';
import { Route , Switch, Redirect} from "react-router-dom";
import axios from "axios";

const AppContainer = styled.div`
position:fixed;
width:100%;
background-image:url('https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80');
background-size:cover;

`;

class App extends React.Component {
  state = {
    friends: [],
    errorMessage: "",
    newName: "",
    newBio: "",
    added:false
  };
  getFriends = async () => {
    try {
      const axoisData = await axios.get("http://localhost:3000/api/users");
      this.setState({ friends: axoisData.data });
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    }
  };
  postFriend = async (e,b) => {
    try {
      e.preventDefault();
      console.log(this.state.newName ,this.state.newBio)
      await axios.post("http://localhost:3000/api/users", {
        name : this.state.newName,
        bio : this.state.newBio,
      });
      // eslint-disable-next-line no-restricted-globals
      location.pathname=(`/`)
      return this.getFriends();
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    }
  };
  updateFriend = async(e, id) => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:3000/api/users/${id}`,
        {
          name: this.state.newName,
          bio: this.state.newBio,
        }
      );
        // eslint-disable-next-line no-restricted-globals
      location.pathname=(`/`)
      return this.getFriends();
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    }
  };
  deleteFriend = async id => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      return this.getFriends();
    } catch (err) {
      this.setState({
        errorMessage: err.message
      });
    }
  };
  onChangeHandler = (e, text) => {
    console.log(e, text)
    text === "name"  && this.setState({ newName: e });
    text === "bio" && this.setState({ newBio: e });
  };

  componentDidMount() {
    this.getFriends();
    
  }
  render() {
    return (
      <AppContainer>
      <Switch>
      <Route
      exact
      path="/"
      render={props => (

        <FriendList
          data={this.state.friends}
          delete={this.deleteFriend}
          {...props}
        />
      )}
    />
    <Route
    path="/add"
    render={props => (
      this.state.added ? <Redirect to='/' /> :
      <Form
        inputValue={this.onChangeHandler}
        submit={this.postFriend}
        {...props}
      />
    )}
  /> 
        <Route
          path="/:id/update"
          render={props => (
            <Form
               data={this.state.friends}
               get={this.getFriends}
              inputValue={this.onChangeHandler}
              submit={this.updateFriend}
              {...props}
            />
          )}
        />
       
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
