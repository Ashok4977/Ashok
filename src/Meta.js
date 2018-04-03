import React from 'react'

const Meta = () => (
  <React.Fragment>
    <meta name='viewport' content='width=device-width,initial-scale=1' />
    <meta name='generator' content='Compositor X0' />
    <link rel='stylesheet' href='https://unpkg.com/primer-base/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-box/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-breadcrumb/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-buttons/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-forms/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-layout/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-navigation/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-support/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-table/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-tooltips/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-truncate/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-utilities/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-product/build/build.css' />
    <link rel='stylesheet' href='https://unpkg.com/primer-marketing/build/build.css' />
    <link rel='stylesheet' href='https://github.com/site/assets/styleguide.css' />
    <Script src='https://github.com/site/assets/styleguide.js'/>
    <link rel='icon' href='assets/favicon.png' />
    <link rel='apple-touch-icon' href='assets/apple-touch-icon.png' />
    <meta name='og:title' content='Primer React' />
    <meta name='description' content='Primer components built with React.js.' />
  </React.Fragment>
)

export default Meta

class Script extends React.Component {
  componentWillMount() {
    const script = document.createElement('script')
    script.src = this.props.src
    document.head.appendChild(script)
  }

  render() {
    return null
  }
}
