import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { UserIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';
import MovieList from '../components/movieList';
import { fetchMoviesBySearch } from '../api/moviedb';
import { styles } from '../thems';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
    const navigate = useNavigation();
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);

    const personName = item?.title || "Unknown Actor";

    function getInitials(name) {
        if (!name) return "NA";
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }

    useEffect(() => {
        setLoading(true);
        getPersonMovies();
    }, []);

    const getPersonMovies = async () => {
        const fallbacks = ["marvel", "avengers", "fast", "dark", "batman"];
        const randomTerm = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        const data = await fetchMoviesBySearch(randomTerm);
        if(data && data.Response === "True" && data.Search) {
            setPersonMovies(data.Search);
        }
        setLoading(false);
    }

    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 100 }}>
            {/* back button */}
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigate.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        {/* person details */}
                        <View className="flex-row justify-center"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}>
                            <View className="h-40 w-40 rounded-full bg-neutral-700 items-center justify-center border-2 border-neutral-500">
                                <Text className="text-white text-5xl font-bold tracking-widest">
                                    {getInitials(personName)}
                                </Text>
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {personName}
                            </Text>
                            <Text className="text-base text-neutral-500 text-center">
                                Hollywood, USA
                            </Text>
                        </View>

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold flex-col text-center">Gender</Text>
                                <Text className="text-neutral-300 text-sm">N/A</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold flex-col text-center">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">N/A</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold flex-col text-center">Known for</Text>
                                <Text className="text-neutral-300 text-sm">Acting</Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold flex-col text-center">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">100.0</Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 mx-4 tracking-wide">
                                {personName} is an incredibly talented prominent actor in contemporary cinema. Known for their work across a range of high-profile blockbuster genres, {personName} has received several critical accolades and is widely regarded as one of the best character-actors of their generation.
                            </Text>
                        </View>

                        <MovieList
                            title="Movies"
                            hideSeeAll={true}
                            data={personMovies}
                        />
                    </View>
                )
            }
        </ScrollView>
    )
}