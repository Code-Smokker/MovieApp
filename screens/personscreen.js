import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';
import MovieList from '../components/movieList';
import { styles } from '../thems';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
    const navigate = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [personMovies, setPersonMovies] = useState([
        { id: 1, title: 'Uri: The Surgical Strike' },
        { id: 2, title: 'Masaan' },
        { id: 3, title: 'Raazi' },
        { id: 4, title: 'Sanju' }
    ]);

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
                            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                                <Image source={require('../assets/images/uri.png')}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                Vicky Kaushal
                            </Text>
                            <Text className="text-base text-neutral-500 text-center">
                                Mumbai, Maharashtra
                            </Text>
                        </View>

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">Male</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">1988-05-16</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm">Acting</Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">84.23</Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 mx-4 tracking-wide">
                                Vicky Kaushal (pronounced born 16 May 1988) is an Indian actor who works in Hindi films. Known for his work across a range of genres, he has received several accolades, including a National Film Award and three Filmfare Awards, Kaushal has featured in Forbes India's Celebrity 100 list and is regarded as one of the prominent actors of his generation in contemporary Hindi cinema.
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