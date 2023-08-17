import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from '../components/RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker'

const styles = StyleSheet.create({
    container: {
    height: 10,
      },
  });


const ItemSeparator = () => <View style={styles.seperate} />;

export const RepositoryContainer = ({ repositories, loading, order, setOrder }) => {
  console.log(repositories)

  const repositoryNodes = repositories?.repositories?.edges?.map(e => e.node) || [];

  console.log(repositoryNodes)
  if (loading) return (<View><Text>Loading repositories...</Text></View>);
  else if (!repositoryNodes) return (<View><Text>No repositories</Text></View>);

  return (
    <FlatList
    testID='repoFlatlist'
          data={repositoryNodes}
         renderItem={({item}) => <RepositoryItem testID='RepositoryItem' item={item}/>}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={() => (
          <Picker selectedValue={order} style={{ height: 40, width: '90%', margin:18 }} onValueChange={(itemValue) => setOrder(itemValue)}>
            <Picker.Item label='Latest repositories' value='latest'/> 
            <Picker.Item label='Lowest rated repositories' value='lowest'/>
            <Picker.Item label='Highest rated repositories' value='highest'/>
          </Picker>
          )} />
  )
}

const RepositoryList = () => {
  
  const { data: repositories, loading, refetch } = useRepositories();
  console.log(repositories)

  
  const [order, setOrder] = useState('latest');
  useEffect(() => {
    switch(order) {
      case 'latest':
        console.log("latest")
        refetch({orderBy: 'CREATED_AT', orderDirection: 'DESC'});
        break;
      case 'highest':
        refetch({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
        break;
      case 'lowest': 
        refetch({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
        break;
      default:
        throw new Error(`Orderby: ${orderBy}, Orderdirection: ${orderDirection}`)
    }
  }, [order]);
  return (
    <RepositoryContainer repositories={repositories} loading={loading} order={order} setOrder={setOrder}/>
  )    
};

export default RepositoryList;