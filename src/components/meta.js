import React from "react"
import MetaTags from "react-meta-tags"

class Meta extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MetaTags>
          <title>My react App</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </MetaTags>
      </div>
    )
  }
}

export default Meta