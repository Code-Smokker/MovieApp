import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMovieDetails, fetchMoviesBySearch } from '../api/moviedb';
import Cast from '../components/cast';
import Loading from '../components/loading';
import MovieList from '../components/movieList';
import { styles } from '../thems';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const toMargin = ios ? '' : 'mt-3';

export default function Moviescreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigate = useNavigation();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (item && item.imdbID) {
            getMovieDetails(item.imdbID);
        } else {
            setLoading(false);
        }
    }, [item]);

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if (data) {
            setMovie(data);
            getSimilarMovies(data.Title);
        }
        setLoading(false);
    }

    const getSimilarMovies = async title => {
        const fallbacks = ["fast", "avengers", "marvel", "dark", "spider", "batman"];
        // query based on the first word of the existing movie title
        const queryTerm = title ? title.split(' ').filter(w => w.length > 2)[0] || fallbacks[0] : fallbacks[0];
        const data = await fetchMoviesBySearch(queryTerm);
        if (data && data.Response === "True" && data.Search) {
            // Filter out the exact same current movie to avoid self-duplication in Similar Movies
            setSimilarMovies(data.Search.filter(m => m.imdbID !== item.imdbID));
        } else {
            const fb = await fetchMoviesBySearch(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
            if (fb && fb.Response === "True") setSimilarMovies(fb.Search);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + toMargin}>
                    <TouchableOpacity onPress={() => navigate.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={28} strokeWidth={2.5} color={isFavourite ? "red" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            {
                                movie?.Poster && movie.Poster !== "N/A" ? (
                                    <Image
                                        source={{ uri: movie.Poster }}
                                        style={{ width: width, height: height * 0.55 }}
                                    />
                                ) : (
                                    <View
                                        style={{ width: width, height: height * 0.55 }}
                                        className="bg-neutral-800 items-center justify-center"
                                    >
                                        <Text className="text-white text-5xl font-bold tracking-widest text-center mt-20">
                                            {(movie?.Title || item?.Title || "NA").substring(0, 2).toUpperCase()}
                                        </Text>
                                    </View>
                                )
                            }
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.40, position: 'absolute', bottom: 0 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                            />
                        </View>
                    )
                }
            </View>

            {
                !loading && (
                    <View>
                        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                            <Text className="text-white text-3xl text-center font-bold tracking-wider">
                                {movie?.Title || item?.Title || "Unknown"}
                            </Text>
                            <Text className="text-neutral-400 font-semibold text-base text-center">
                                Released • {movie?.Released || 'N/A'} • imdb {movie?.imdbRating || 'N/A'}
                            </Text>
                            <View className="flex-row justify-center mx-4 space-x-2">
                                {
                                    movie?.Genre?.split(',').map((genre, index, arr) => {
                                        return (
                                            <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                                {genre.trim()} {index + 1 !== arr.length ? '|' : ''}
                                            </Text>
                                        )
                                    })
                                }
                            </View>
                            <Text className="text-neutral-400 mx-4 tracking-wide">
                                {movie?.Plot || "Biography overview unavailable."}
                            </Text>
                        </View>
                        <Cast navigation={navigate} actors={movie?.Actors} />
                        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
                    </View>
                )
            }
        </ScrollView>
    )
}