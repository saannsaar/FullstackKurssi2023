import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from '../components/RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';

const styles = StyleSheet.create({
    container: {
    height: 10,
      },
  });


const ItemSeparator = () => <View style={styles.seperate} />;

export class RepositoryContainer extends React.Component {

  renderHeader = () => {
    const { searchWord, setSearchWord, order, setOrder} = this.props;
    return (
      <>
      <View>
        <TextInput style={{width:'90%', marginLeft: 18}}value={searchWord} onChangeText={(value) => setSearchWord(value)} placeholder='Search repository'/>
      </View>
      <Picker selectedValue={order} style={{ borderColor:'#FFFFFF', height: 30, width: '90%', marginLeft:18 }} onValueChange={(itemValue) => setOrder(itemValue)}>
            <Picker.Item label='Latest repositories' value='latest'/> 
            <Picker.Item label='Lowest rated repositories' value='lowest'/>
            <Picker.Item label='Highest rated repositories' value='highest'/>
      </Picker>
      </>
    )
  }

  render() {
    
    const { repositories, loading, onEndReached } = this.props;
    const repositoryNodes = repositories?.edges?.map(e => e.node) || [];
    console.log(repositoryNodes)
    if (loading) return (<View><Text>Loading repositories...</Text></View>);
  else if (!repositoryNodes) return (<View><Text>No repositories</Text></View>);
    return (
      <FlatList
      testID='repoFlatlist'
            data={repositoryNodes}
           renderItem={({item}) => <RepositoryItem testID='RepositoryItem' item={item}/>}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={this.renderHeader}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5} />
    )
  }

}

const RepositoryList = () => {
  
  const { repositories, loading, fetchMore, refetch } = useRepositories({ first: 8 });
  console.log(repositories)

  const [searchWord, setSearchWord] = useState('');
  const [order, setOrder] = useState('latest');
  const [debounceSearch] = useDebounce(searchWord, 500);

  useEffect(() => {
    switch(order) {
      case 'latest':
        console.log("latest")
        refetch({first: 8, searchKeyword: debounceSearch, orderBy: 'CREATED_AT', orderDirection: 'DESC'});
        break;
      case 'highest':
        refetch({first: 8, searchKeyword: debounceSearch, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
        break;
      case 'lowest': 
        refetch({first: 8, searchKeyword: debounceSearch, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
        break;
      default:
        throw new Error(`Orderby: ${orderBy}, Orderdirection: ${orderDirection}`)
    }
  }, [debounceSearch, order]);

  const onEndReached = () => {
    fetchMore();
  }
  return (
    <RepositoryContainer repositories={repositories} loading={loading} order={order} setOrder={setOrder} searchWord={searchWord} onEndReached={onEndReached} setSearchWord={setSearchWord}/>
  )    
};

export default RepositoryList;