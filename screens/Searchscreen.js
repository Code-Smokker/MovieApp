import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMoviesBySearch } from '../api/moviedb';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window');

export default function Searchscreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true);
            fetchMoviesBySearch(value).then(data => {
                setLoading(false);
                if (data && data.Response === "True") setResults(data.Search);
                else setResults([]);
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search movie"
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold tracking-wider text-white"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size={25} color="white" />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading />
                ) :
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="space-y-3"
                        >
                            <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        const fallbackText = (item.Title || "NA").substring(0, 2).toUpperCase();
                                        return (
                                            <TouchableWithoutFeedback
                                                key={item.imdbID ? `${item.imdbID}-${index}` : index.toString()}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View className="space-y-2 mb-4">
                                                    {
                                                        item.Poster && item.Poster !== "N/A" ? (
                                                            <Image
                                                                source={{ uri: item.Poster }}
                                                                style={{ width: width * 0.44, height: height * 0.3 }}
                                                                className="rounded-3xl"
                                                            />
                                                        ) : (
                                                            <View
                                                                style={{ width: width * 0.44, height: height * 0.3 }}
                                                                className="bg-neutral-800 rounded-3xl items-center justify-center border border-neutral-500"
                                                            >
                                                                <Text className="text-white text-5xl font-bold tracking-widest text-center">
                                                                    {fallbackText}
                                                                </Text>
                                                            </View>
                                                        )
                                                    }
                                                    <Text className="text-neutral-300 ml-1 mt-1">
                                                        {item.Title && item.Title.length > 22 ? item.Title.slice(0, 22) + "..." : item.Title}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-col justify-center items-center">
                            <Image source={require('../assets/images/movieTime.png')} className="h-96 w-96 rounded-3xl" />
                            <Text className="text-white font-semibold text-lg mt-4">No movies found</Text>
                        </View>
                    )
            }
        </SafeAreaView>
    );
}