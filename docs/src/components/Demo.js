// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import CodeIcon from '@material-ui/icons/Code'
import MarkdownElement from 'docs/src/components/MarkdownElement'

const requireDemos = require.context('docs/src', true, /\.js$/)
const requireDemoSource = require.context('!raw-loader!docs/src', true, /\.js$/)

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
    marginBottom: 40,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  codeButton: {
    display: 'none',
    zIndex: 10,
    position: 'absolute',
    top: 2,
    right: 7,
    fontSize: 8,
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
  [theme.breakpoints.up(600)]: {
    codeButton: {
      display: 'block',
    },
    code: {
      display: 'block',
    },
    root: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
})

class Demo extends Component {
  state = {
    codeOpen: false,
  }

  handleCodeButtonClick = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    })
  }

  render() {
    const DemoComponent = requireDemos(`./${this.props.demo}`).default
    const demoSource = requireDemoSource(`./${this.props.demo}`)

    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleCodeButtonClick}
          className={classes.codeButton}
        >
          Source <CodeIcon />
        </IconButton>
        <Collapse in={this.state.codeOpen}>
          <h3 style={{ fontWeight: 300, marginLeft: 10 }}>Example Source</h3>
          <MarkdownElement
            className={classes.code}
            text={`\`\`\`js\n${demoSource}\n\`\`\``}
          />
        </Collapse>
        <Paper className={classes.paper}>
          <DemoComponent />
        </Paper>
      </div>
    )
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  demo: PropTypes.string.isRequired,
}

export default withStyles(styles)(Demo)
