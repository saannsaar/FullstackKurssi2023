import { FlatList, View, StyleSheet } from 'react-native';
import individualItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    container: {
    height: 10,
      },
  });


const ItemSeparator = () => <View style={styles.seperate} />;

   

console.log("repoLisjt")

const RepositoryList = () => {
  const { repoData, loading } = useRepositories();
  console.log(repoData)

  const repositoryNodes = repoData && !loading ?
  repoData.edges.map(edge => edge.node) : [];

    console.log(repositoryNodes)
    console.log(repositoryNodes.length)
  return (
    <><FlatList
          data={repositoryNodes}
         renderItem={individualItem}
          ItemSeparatorComponent={ItemSeparator} /></>
  );
};

export default RepositoryList;