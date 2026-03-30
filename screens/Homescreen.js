import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/movieList';
import TredingMovies from '../components/tredingMovies';
import Loading from '../components/loading';
import { fetchMoviesBySearch } from '../api/moviedb';
import { theme } from '../thems';

const ios = Platform.OS === 'ios';

export default function Homescreen() {
  const navigate = useNavigation();
  const [loading, setLoading] = useState(true);
  
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchMoviesBySearch("Marvel");
    if(data && data.Search) setTrending(data.Search);
    setLoading(false);
  }
  
  const getUpcomingMovies = async () => {
    const data = await fetchMoviesBySearch("Avengers");
    if(data && data.Search) setUpcoming(data.Search);
  }

  const getTopRatedMovies = async () => {
    const data = await fetchMoviesBySearch("Batman");
    if(data && data.Search) setTopRated(data.Search);
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView style={ios ? { marginBottom: -2 } : { marginBottom: 12 }}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Bars3BottomLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={styles.title}>
            <Text style={{ color: theme.primary }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigate.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <TredingMovies data={trending} />
            <MovieList title="Upcoming" data={upcoming} />
            <MovieList title="Top Rated" data={topRated} />
          </ScrollView>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
});