import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    text: {
        color: 'grey',
        fontSize: 14,
      },
      blueText: {
        color: 'blue',
      },
      bigText: {
        fontSize: 24,
        fontWeight: '700',
      },
  });

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];


const ItemSeparator = () => <View style={styles.separator} />;

const Item = (props) => (
  

        <View>
        <Text color="textSecondary" style={{ paddingTop: 10}} fontWeight="bold">Full name: {props.fullName}</Text>
        <Text color="textSecondary">Description: {props.description}</Text>
        <Text color="textSecondary">Language: {props.language}</Text>
        <Text color="textSecondary">Stars: {props.stars}</Text>
        <Text color="textSecondary">Forks: {props.forks}</Text>
        <Text color="textSecondary">Reviews: {props.reviews}</Text>
        <Text color="textSecondary">Ratings: {props.ratings}</Text>
    </View>
    )
   

console.log("repoLisjt")
console.log(repositories)
const RepositoryList = () => {

    console.log(repositories)
  return (
    <><FlatList
          data={repositories}
          renderItem={({ item }) =>
           <Item fullName={item.fullName} description={item.description} 
           language={item.language}
           stars={item.stargazersCount}
           forks={item.forksCount}
           reviews={item.reviewCount}
           ratings={item.ratingAverage} />}
          ItemSeparatorComponent={ItemSeparator} /></>
  );
};

export default RepositoryList;