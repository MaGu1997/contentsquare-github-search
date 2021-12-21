import React, { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import SearchFilter from "./components/SearchFilter";
import OverviewTabs from "./components/OverviewTabs";
import UserDetails from "./components/UserDetails";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  //CHANGE USER NAME HERE
  const [user] = useState("MaGu1997");

  const [repositories, setRepositories] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  //FETCH USER INFORMATION
  const fetchUserInfo = async (user) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (response) {
        const info = await response.json();

        setUserInfo(info);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH REPOSITORIES OF USER
  const fetchRepositories = async (user) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=100`
      );
      if (response) {
        const repo = await response.json();
        await setRepositories(repo);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH USER INFO AND REPOSITORIES INFO
  useEffect(() => {
    fetchUserInfo(user);
    fetchRepositories(user);
  }, [user]);

  return loading ? (
    <div className="App">
      <header className="App-header">
        <img src="/contentsquarelogo.png" className="App-loading" alt="loading" />
      </header>
    </div>
  ) : (
    <React.Fragment>
      <NavigationBar />
      <div className="main-container">
        <Row>
          <Col lg={3}>
            <UserDetails userInfo={userInfo} className="user-details" />
          </Col>
          <Col lg={9}>
            <OverviewTabs repositoryCount={repositories.length} />
            <SearchFilter repositories={repositories} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default App;
