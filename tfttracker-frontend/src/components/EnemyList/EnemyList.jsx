import React from "react";
import { ListGroup } from "react-bootstrap";
import "./EnemyList.css";

const EnemyList = ({ enemy, findEnemy }) => {
  return (
    <div className="list-container">
      <div className="text-container">
        <div className="list-text" onClick={() => findEnemy(enemy)}>{enemy}</div>
      </div>
    </div>
  );
};

export default EnemyList;
