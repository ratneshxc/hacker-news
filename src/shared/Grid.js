import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
        loading: false,
        pageNext: repos.nbPage === repos.page ? repos.page: repos.page + 1,
        pagePrevious: repos.page === 1 ? repos.page : repos.page -1
      }))
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light",
        axisY:{
          includeZero: false
        },
        axisX:{
          includeZero: false
        },
        data: [{        
          type: "line",
              indexLabelFontSize: 16,
          dataPoints: [
            { y: 450, x:10  },
            { y: 414, x:20},
            { y: 520, x:30 },
            { y: 460 , x:40 },
            { y: 450, x:50  },
            { y: 500, x:60  },
            { y: 480, x:70  },
            { y: 480, x:80  },
            { y: 410, x:90   },
            { y: 500, x:100  },
            { y: 480, x:110  },
            { y: 510, x:120  }
          ]
        }]
      });
      chart.render();
    })
  }
  render() {
    const { loading, repos, pageNext, pagePrevious } = this.state

    if (loading === true) {
      return <p>LOADING</p>
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
        <tr>
          <td>{item.num_comments}</td>
          <td></td>
          <td></td>
          <td>{item.title}</td>
        </tr>): ''
        )}
      </table>
      <div>
      <NavLink activeStyle={{fontWeight: 'bold'}} to={`/news/${pagePrevious}`}>
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

