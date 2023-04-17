# Material UI Intermediate

## withStyles
https://material-ui.com/customization/css-in-js/

ALPHA OF NEW PACKAGE: https://material-ui.com/css-in-js
This is screaming new tech. JSS. WOAH. Material-UI recommends using javascript to make your styles. 

They are in process of moving the style code into its own package-- this may change!


Link a style sheet with a component.  
It does not modify the component passed to it; instead, it returns a new component with a classes property.  
This classes object's keys are the names of the class names injected in the DOM. Their values are what those CSS properties are set to.

Note, that you will need to convert CSS names that have dashes (`background-color`) to camelCase (`backgroundColor`).
Keys that have symbols (for psuedo-selectors) will have to be strings.

```
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```



## Grid

It uses CSS 3’s Flexible Box module for high flexibility.
There are 12 imaginary columns upon which things can be.
There are two type of layout: containers and items.
Item widths are set in percentages, so they’re always fluid and sized relative to their parent element.
Items have padding to create the spacing between individual items.
There are five grid breakpoints: xs, sm, md, lg, and xl.

### Containers
Containers are the actual grid on which items will rest.

Grid containers take the prop spacing -- 

it can be one of the following values: 0, 8, 16, 24, or 40, and will put space between each item.

`<Grid container spacing={24}>...</Grid>`

Advanced flexbox props:
alignItems= enum: 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'
direction= enum: 'row' |'row-reverse' | 'column' |'column-reverse'
justify= enum: 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'

https://material-ui.com/layout/grid/

### Items
Items are the things residing on the grid -- must be nested inside the container.

`<Grid item>...</Grid>`

Setting breakpoints:
Five grid breakpoints: xs, sm, md, lg, and xl.
`<Grid item xs>...</Grid>`

Setting columns at breakpoint: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
`<Grid item xs={3}>...</Grid>`


## Good UX Components
Dialog https://material-ui.com/demos/dialogs/#dialogs
  - Good for confirmation of actions
  
Tooltip https://material-ui.com/demos/tooltips/
  - Good for explaining options without being intrusive
  
Snackbars https://material-ui.com/demos/snackbars/
  - Good for acknoledgement of actions done
