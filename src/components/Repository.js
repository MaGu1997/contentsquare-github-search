import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";
import "../styles/Repository.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const bulletColor = require("./BulletColors.json");

export default function Repository(props) {
  const {
    name,
    description,
    updated_at,
    language,
    forks,
    stargazers_count,
    license,
    ...rest
  } = props;

  return (
    <Card className="repo-card">
      <Card.Body>
        <Card.Title>
          <a href={rest.url}>{name}</a>
          <button className="star-button">
            <i className="bi bi-star"></i> Star
          </button>
        </Card.Title>
        <Card.Text className="text-muted">{description}</Card.Text>
        <div className="repo-info text-muted">
          {language ? (
            <p>
              <FiberManualRecordIcon htmlColor={bulletColor[language]} />
              <span className="language-color"></span>
              {language}
            </p>
          ) : (
            false
          )}
          {stargazers_count > 0 ? (
            <p>
              <i className="bi bi-star"></i>
              {stargazers_count}
            </p>
          ) : (
            ""
          )}
          {license !== null ? (
            <p>
              <i className="bi bi-bank"></i>
              {license.name}
            </p>
          ) : (
            false
          )}

          <p>
            Updated <Moment fromNow>{updated_at}</Moment>
          </p>
          <hr />
        </div>
      </Card.Body>
    </Card>
  );
}
