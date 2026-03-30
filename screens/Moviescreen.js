import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { styles } from '../thems';


const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const toMargin = ios ? '' : 'mt-3';

export default function Moviescreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigate = useNavigation();
    const [loading, setLoading] = useState(false);
    const [cast, setCast] = useState([1, 2, 3, 4]);
    const [similarMovies, setSimilarMovies] = useState([
        { id: 1, title: 'Inception' },
        { id: 2, title: 'Interstellar' },
        { id: 3, title: 'The Dark Knight' },
        { id: 4, title: 'Tenet' }
    ]);

    useEffect(() => {
    }, [item]);

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
                            <Image source={require('../assets/images/uri.png')}
                                style={{ width: width, height: height * 0.55 }}
                            />
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
                                {item?.title || "Movie Name"}
                            </Text>
                            <Text className="text-neutral-400 font-semibold text-base text-center">
                                Release Date - 2022
                            </Text>
                            <View className="flex-row justify-center mx-4 space-x-2">
                                <Text className="text-neutral-400 font-semibold text-base text-center">
                                    Action |
                                </Text>
                                <Text className="text-neutral-400 font-semibold text-base text-center">
                                    Thriller |
                                </Text>
                                <Text className="text-neutral-400 font-semibold text-base text-center">
                                    Motivational
                                </Text>
                            </View>
                            <Text className="text-neutral-400 mx-4 tracking-wide">
                                Uri: The Surgical Strike is a 2019 Indian Hindi-language war action film written and directed by debutant Aditya Dhar and produced by Ronnie Screwvala under the RSVP Movies banner.[5] An account based on the real story of the retaliation to the 2016 Uri attack, the film stars Vicky Kaushal along with Yami Gautam, Paresh Rawal, Kirti Kulhari, and Mohit Raina in pivotal roles, and tells the story of Major Vihaan Shergill (Kaushal) of the Para (Special Forces), who played a leading role in the events.[6][7]
                            </Text>
                        </View>
                        <Cast navigation={navigate} cast={cast} />
                        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
                    </View>
                )
            }
        </ScrollView>
    )
}