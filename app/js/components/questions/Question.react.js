import React from "react"

let retreive_id_from_params = (params_id) => {
  return params_id ? (params_id.substring(0, params_id.indexOf('-'))) : params_id
}


class Question extends React.Component {
  constructor(props, context){
    super(props);
  }

  render(){
    return (
      <div className="full-height">
        <div className="main-wrapper">
          {this.props.children && React.cloneElement(this.props.children, {
            question_id: retreive_id_from_params(this.props.params.id)
          })}
        </div>
      </div>
    )
  }
}

module.exports = Question;
