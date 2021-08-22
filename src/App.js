import React from "react";
import "./App.css";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";
import ReposDisplay from "./components/ReposDisplay/ReposDisplay";

class App extends React.PureComponent {
  state = { currentUser: "" };

  updateUser = (value) => {
    this.setState({ currentUser: value });
  };
  userFromStorage = (value) => {
    this.setState({ currentUser: value });
  };
  render() {
    return (
      <div className="App">
        <ProfileDisplay updateUser={this.updateUser} />
        <ReposDisplay
          currentUser={this.state.currentUser}
          userFromStorage={this.userFromStorage}
        />
      </div>
    );
  }
}

export default App;
