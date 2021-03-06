import React from 'react'
import Common from "../../utils/Common.js"
import { Link } from 'react-router';

const RelatedInformation = ({ relatedInformation }) => {
  let permalink = Common.createPermalink(relatedInformation.id, relatedInformation.title);
  let type = relatedInformation.type ? relatedInformation.type.toLowerCase() : 'info'
  let content = Common.elipsize(Common.sanitizeString(relatedInformation.content), 200);

  return (
    <div className="content">
      <div className="summary">
          The {type}
      </div>

      <div className="extra text">
        <Link to={`/questions/${permalink}`}>{relatedInformation.title}</Link>
      </div>
      <div className="meta">
        <a className="like">
          {content}
        </a>
      </div>
    </div>
  )
}
export default RelatedInformation
