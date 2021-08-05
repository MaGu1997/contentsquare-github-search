import React from "react";
import Repository from "./Repository";

export default function RepositoriesList(props) {
  const { repositories } = props;
  return (
    <div>
      {repositories.map((repo) => (
        <Repository {...repo} key={repo.id} />
      ))}
    </div>
  );
}
