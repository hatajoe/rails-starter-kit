import React from 'react';
import {
  createStyles,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import { CssBaseline, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '1rem',
    }
  })
);

const FixedContainer = ({ children }) => {
  const classes = useStyles();
  
  return (
    <>
      <Container className={classes.root} fixed>{children}</Container>
    </>
  );
};

export default FixedContainer;
