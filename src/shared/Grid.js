import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TableRow from './TableRow';

class Grid extends Component {
  constructor(props) {
    super(props)

    let repos
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }

    this.state = {
      repos,

      loading: repos ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentDidMount () {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
    
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  
 

   fetchRepos (id) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(id)
      .then((repos) => { this.setState(() => ({
        repos,
        data: repos,
        loading: false,
        pageNext: repos.nbPage === repos.page ? repos.page: repos.page + 1,
        pagePrevious: repos.page === 1 ? repos.page : repos.page -1
      }));
    this.changeLineChart(repos);
    })
  }

   changeLineChart(repos) {
    let dataPoints = [];
    repos.hits.map(item => {
      let vote = localStorage.getItem(`${item.objectID}`)
      if(vote) {
        vote = parseInt(vote);
      }
      dataPoints.push({
       label: `${item.objectID}`,
       y: vote
      })
    })
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      axisY:[
        {
          title: "Vote",
          lineColor: "#369EAD",
          tickColor: "#369EAD",
          labelFontColor: "#369EAD",
          titleFontColor: "#369EAD",
        }],
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer"
      },
      data: [{        
        type: "line",
        name: "ID",
        color: "#369EAD",
        showInLegend: true,
        axisYIndex: 1,
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }
  
  
  render() {
    const { loading, repos, pageNext, pagePrevious } = this.state

    if (loading === true) {
      return <p>LOADING...</p>
    }

    return (
      <div>
      <table id="customers">
        <tr>
          <th>Comments</th>
          <th>Vote Count</th>
          <th>VoteUp</th>
          <th>News Details</th>
        </tr>
        {repos.hits.map(item => 
        item.title? (
          <TableRow 
            rowData={item}
            changeLineChart={this.changeLineChart}
            repos={repos}
             />
        ): ''
        )}
      </table>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 10
      }}>
      <NavLink activeStyle={{fontWeight: 'bold', marginRight: 8}} to={`/news/${pagePrevious}`}>
            {'Previous'}
    </NavLink>
    <NavLink activeStyle={{fontWeight: 'bold'}} to={`/news/${pageNext}`}>
            {'Next'}
    </NavLink>
      </div>
      <div>
      <div id="chartContainer" style={{height: '300px', width: '100%' }}></div>
      </div>
      </div>
    )
  }
}

export default Grid

