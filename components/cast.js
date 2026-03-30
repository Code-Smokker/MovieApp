import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { UserIcon } from 'react-native-heroicons/solid';

export default function Cast({ actors, navigation }) {
    // Parse OMDb comma-separated actors string into a clean array
    const castArray = actors && actors !== "N/A" ? actors.split(',').map(name => name.trim()) : [];

    function getInitials(name) {
        if (!name) return "NA";
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }

    if (castArray.length === 0) {
        return (
            <View className="mb-8 mx-4">
                <Text className="text-white text-lg mb-5">Cast</Text>
                <Text className="text-neutral-400 text-sm">No cast available</Text>
            </View>
        );
    }

    return (
        <View className="mb-8">
            <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {castArray.map((personName, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            className="mr-4 items-center"
                            onPress={() => navigation.navigate('Person', { title: personName })}
                        >
                            <View className="rounded-full h-20 w-20 items-center justify-center bg-neutral-700 border border-neutral-500">
                                <Text className="text-white text-3xl font-bold tracking-widest">
                                    {getInitials(personName)}
                                </Text>
                            </View>

                            <Text className="text-neutral-300 text-xs mt-2 text-center">
                                {personName.length > 14 ? personName.slice(0, 14) + '...' : personName}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View >
    );
}