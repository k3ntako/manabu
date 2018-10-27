import React from 'react'

const Predictions = props => {
  let prediction1 = "";
  let prediction2 = "";
  
  if(props.stationPrediction && Object.keys(props.stationPrediction).length != 0){
    for(let i = 0; i<props.stationPrediction.data.length; i++){
      let train = props.stationPrediction.data[i];

      let now = new Date();
      if(train.attributes.departure_time){

        let timeTilArrival = (Date.parse(train.attributes.arrival_time) - now)/60000

        if(timeTilArrival > 0){
          if(timeTilArrival < 1){
            timeTilArrival *= 60
            timeTilArrival = timeTilArrival.toFixed(0)
            timeTilArrival = `${timeTilArrival} seconds`
          }else{
            timeTilArrival = timeTilArrival.toFixed(0)
            timeTilArrival = `${timeTilArrival} minutes`
          }

          if(!prediction1 ){
            prediction1 = (<div className = "prediction cell small-24 large-12">{timeTilArrival}</div>);
          }else if (!prediction2) {
            prediction2 = (<div className = "prediction cell small-24 large-12">{timeTilArrival}</div>);
          }
        }
      }
    }
  }

  return(
    <div className="predictions grid-x grid-margin-x grid-margin-y">
      {prediction1}
      {prediction2}
    </div>
  )
}

export default Predictions
