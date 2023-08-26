import React, { Component } from "react";
import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";
import {
  getTotalPhotos,
  getTotalTopics,
  getUserWithMostUploads,
  getUserWithLeastUploads
 } from "helpers/selectors";

const data = [
  {
    id: 1,
    label: "Total Photos",
    getValue: getTotalPhotos
  },
  {
    id: 2,
    label: "Total Topics",
    getValue: getTotalTopics
  },
  {
    id: 3,
    label: "User with the most uploads",
    getValue: getUserWithMostUploads
  },
  {
    id: 4,
    label: "User with the least uploads",
    getValue: getUserWithLeastUploads
  }
];


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      focused: null,
      photos: [],
      topics: []
    };
  }

  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  componentDidMount() {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.setState(parsedData);
    }
    const urlsPromise = [
      "/api/photos",
      "/api/topics",
    ].map(url => fetch(url).then(response => response.json()));
    
    
    Promise.all(urlsPromise)
    .then(([photos, topics]) => {
      this.setState({
        loading: false,
        photos: photos,
        topics: topics
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if state values have changed
    if (prevState.focused !== this.state.focused) {
      // Save data to localStorage
      const dataToStore = JSON.stringify(this.state);
      localStorage.setItem('dashboardData', dataToStore);
    }
  }

  render() {

    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) {
      console.log('state:',this.state);
      return <Loading />;
      
    }

    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
    .map(panel => (
     <Panel
      key={panel.id}
      id={panel.id}
      label={panel.label}
      value={panel.getValue(this.state)}
      onSelect={() => this.selectPanel(panel.id)}
     />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
   
  }
}

export default Dashboard;
