import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./components/Landing";
import GoogleSearchItem from "./components/GoogleSearchItem";
import TitleScraper from "./components/TitleScraper";
import ConfigurableTable from "./components/ConfigurableTable";
import HeatMap from "./components/HeatMap";

import { data } from "./data/heatMapData";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route
      exact
      path="/google-search-item"
      render={props => (
        <GoogleSearchItem
          {...props}
          title="Vulcan Search: Digital Marketing Solutions Powered By Data Intelligence"
          url="https://vulcansearch.com/"
          description="Digital marketing solutions designed to amplify performance and drive sustainable growth through multi-channel integration and cognitive technology."
        />
      )}
    />
    <Route exact path="/title-scraper" component={TitleScraper} />
    <Route exact path="/configurable-table" component={ConfigurableTable} />
    <Route
      exact
      path="/heatmap"
      render={props => (
        <HeatMap {...props} data={data} />
      )}
    />
    {/* <Route component={NoMatch} /> */}
  </Switch>
);

export default Routes;
