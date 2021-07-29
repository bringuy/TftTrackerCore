import {React, useState, useEffect} from "react";
import {Card, ProgressBar} from "react-bootstrap";
import "./EnemyIcon.css";

const EnemyIcon = ({ enemy }) => {

  const [barColour, setBarColour] = useState('')

  useEffect(() => {
    if(enemy.health_points >= 50){
      setBarColour('success')
    }
    if (50 > enemy.health_points >= 25){
      setBarColour('warning')
    }
    if (enemy.health_points < 25){
      setBarColour('danger')
    }
  }, [enemy]);

  return (
    <Card className='enemy-icon-card'>
      <div className='enemy-icon-container'>
        <div className="username">{enemy.username}</div>
        <div className="text">{enemy.health_points} hp</div>
        <ProgressBar>
          <ProgressBar variant={barColour} striped now={enemy.health_points}/>
        </ProgressBar>
      </div>
    </Card>
  );
};

export default EnemyIcon;
