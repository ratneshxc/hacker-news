import React, { Component } from 'react';


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        voteCount: 0
    }
  }

  componentDidMount () {
      const { num_comments, title, objectID } = this.props.rowData;
      let vote =  localStorage.getItem(`${objectID}`);
      if(vote) {
        vote = parseInt(vote);
      }
      this.setState(() => ({
        num_comments, 
        title, 
        objectID,
        voteCount: vote
      }));
  }
  
  upVoteFunction(id) {
    let vote =  localStorage.getItem(`${id}`);
    if(vote) {
        vote = parseInt(vote);
      }
    let count = vote + 1;
    this.setState(() => ({
        voteCount: count
      }));
    localStorage.setItem(`${id}`, count.toString());
    this.props.changeLineChart(this.props.repos);
}
  
  render() {
    const { num_comments, title, objectID, voteCount } = this.state;

    return (
        <tr>
          <td>{num_comments}</td>
          <td>{voteCount || 0}</td>
          <td><img 
          style={{ cursor: 'pointer' }}
          src="https://img.icons8.com/officel/16/000000/sort-up.png"
          onClick={() => this.upVoteFunction(objectID)}
          /></td>
          <td>{title}</td>
        </tr>
    )
  }
}

export default TableRow

