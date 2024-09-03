function PlumbCard(){
    return(
        <div>
               <div className="col-md-4" key={index}>
              <div className="card mb-4 plumb-card">
                <img
                  src={plumber.image}
                  className="card-img-top profile-picture"
                  alt={plumber.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{plumber.name}</h5>
                  <p className="card-text">Skill: {plumber.skill}</p>
                  <p className="card-text">Rates: {plumber.rates}</p>
                </div>
              </div>
              
            </div>
        </div>
    )
}
export default PlumbCard;