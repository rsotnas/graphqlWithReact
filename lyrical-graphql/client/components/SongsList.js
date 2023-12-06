import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const query = gql`
  {
    songs {
      title
    }
  }
`;

// const SongsList = (props) => {
//   // console.log(props);

//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const renderSongs = () => {
//     return songs.map((song) => {
//       return <li key={song.title}>{song.title}</li>;
//     });
//   };

//   useEffect(() => {
//     // if (props?.data?.songs) {
//     //   setSongs(props.data.songs);
//     //   setLoading(false);
//     // }
//     if (!props.data.loading) {
//       setSongs(props.data.songs);
//       setLoading(false);
//     }
//   }, [props.data.loading]);

//   // return when props.data.loading is false
//   if (!loading) {
//     return <div>{renderSongs()}</div>;
//   }
// };

class SongsList extends Component {
  renderSongs() {
    return this.props.data.songs.map((song) => {
      return <li key={song.title}>{song.title}</li>;
    });
  }

  render() {
    // console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return <div>{this.renderSongs()}</div>;
  }
}

export default graphql(query)(SongsList);
