var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var RepoList = React.createClass({
  getDataSource: function(repos) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(repos);
  },

  renderRow: function(rowData, sectionID, rowID) {
    return (
      <Text style={styles.repoRow}>
        {rowData.name}
      </Text>
    );
  },

  render: function() {
    var source = this.getDataSource(this.props.repos);
    return (
      <ListView
        dataSource={source}
        renderRow={this.renderRow}/>
    );
  }
});

var styles = StyleSheet.create({
  repoRow: {
    marginTop: 10,
    fontStyle: 'italic'
  }
});

module.exports = RepoList;
