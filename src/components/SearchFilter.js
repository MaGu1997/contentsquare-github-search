/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import "../styles/SearchFilter.css";
import RepositoriesList from "./RepositoriesList";

export default function SearchFilter(props) {
  const { repositories } = props;
  const [search, setSearch] = useState("");
  const [repos, setRepos] = useState(repositories);
  const [language, setLanguage] = useState("All");
  const [type, setType] = useState("All");

  //SET REPOSITORIES FROM PROPS
  useEffect(() => {
    setRepos(repositories);
  }, [repositories]);

  //FILTER REPOS BY SEARCH
  useEffect(() => {
    setRepos(
      repositories.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, repositories]);

  //FILTER BY LANGUAGE
  const filterByLang = (l) => {
    setRepos(repositories);
    let filter = repositories.filter((repo) => {
      return repo.language === l;
    });
    setRepos(filter);
  };

  //FILTER BY LANGUAGE
  // CLEAN REPOSITORIES ARRAY
  const getLanguages = repositories
    .map((repo) => {
      return repo.language;
    })
    .filter((item) => item !== null);
  getLanguages.push("All");
  const filterLang = [...new Set(getLanguages)];

  //FILTER BY TYPE
  const types = ["All", "Sources", "Forks", "Archived", "Mirrors"];
  const filterByType = (t) => {
    setRepos(repositories);
    let filter = repositories.filter((repo) => {
      switch (t) {
        case "Sources":
          return repo.sources === true;
        case "Forks":
          return repo.fork === true;
        case "Archived":
          return repo.archived === true;
        case "Mirrors":
          return repo.mirror === true;
        default:
          break;
      }
    });
    setRepos(filter);
  };

  // FILTER BY STARS
  const filterByStars = (r) => {
    let filter = r
      .sort((a, b) => {
        return a.stargazers_count - b.stargazers_count;
      })
      .reverse();
    setRepos(filter);
  };

  const handleLanguage = (e) => {
    if (e.target.text === "All") {
      setRepos(repositories);
      setLanguage("All");
    } else {
      filterByLang(e.target.text);
      setLanguage(e.target.text);
    }
  };
  const handleType = (e) => {
    if (e.target.text === "All") {
      setRepos(repositories);
    } else {
      filterByType(e.target.text);
      setType(e.target.text);
    }
  };
  console.log("PROPS", repos);
  return (
    <React.Fragment>
      <div className="search">
        <Col lg={7} className="search-column">
          <FormControl
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Find a repository..."
            className="mr-sm-2"
          />
        </Col>
        <Col lg={4} className="dropdown-column">
          <div className="filter-dropdowns">
            <DropdownButton
              title={"Type: " + type}
              id="dropdown-menu-align-right"
            >
              {types.map((type, i) => (
                <Dropdown.Item onClick={handleType} key={i}>
                  {type}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              title={"Language: " + language}
              id="dropdown-language"
            >
              {filterLang.map((lan, i) => (
                <Dropdown.Item onClick={handleLanguage} key={i}>
                  {lan}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton title="Sort " id="dropdown-sort">
              <Dropdown.Item onClick={() => filterByStars(repositories)}>
                Stars
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </div>
      {repos.length !== repositories.length ? (
        <p>
          <b>{repos.length}</b> results found in repositories{" "}
          {search !== "" ? `matching " ${search} " ` : false}
        </p>
      ) : (
        false
      )}
      <RepositoriesList repositories={repos} />
    </React.Fragment>
  );
}
