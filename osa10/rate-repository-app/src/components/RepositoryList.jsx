import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from '../components/RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
const styles = StyleSheet.create({
    container: {
    height: 10,
      },
  });


const ItemSeparator = () => <View style={styles.seperate} />;

   

console.log("repoLisjt")
export const RepositoryContainer = ({ repositories, loading }) => {
  console.log(repositories)

  const repositoryNodes = repositories?.edges?.map(e => e.node) || [];

  console.log(repositoryNodes)
  if (loading) return (<View><Text>Loading repositories...</Text></View>);
  else if (!repositoryNodes) return (<View><Text>No repositories</Text></View>);

  return (
    <FlatList
    testID='repoFlatlist'
          data={repositoryNodes}
         renderItem={({item}) => <RepositoryItem testID='RepositoryItem' item={item}/>}
          ItemSeparatorComponent={ItemSeparator} />
  )
}

const RepositoryList = () => {
  const { repoData, loading } = useRepositories();
  console.log(repoData)
  return (
    <RepositoryContainer repositories={repoData} loading={loading}/>
  )    
};

export default RepositoryList;