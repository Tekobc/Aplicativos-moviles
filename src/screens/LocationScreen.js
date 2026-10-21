import { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';


import * as Location from 'expo-location';


export default function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);


    const obtenerUbicacion = async () => {
        try {
            setLoading(true);


            const permiso = await Location.requestForegroundPermissionsAsync();


            if (permiso.status !== 'granted') {
                Alert.alert(
                    'Permiso denegado',
                    'Necesitamos permiso para obtener tu ubicación.'
                );
                return;
            }




            const resultado = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });


            setLocation(resultado.coords);


        } catch (error) {
            console.log(error);


            Alert.alert('Error', 'No fue posible obtener la ubicación.');


        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Mi ubicación
            </Text>


            <Button
                title="Obtener ubicación"
                onPress={obtenerUbicacion}
                disabled={loading}
            />


            {loading && <ActivityIndicator />}


            {location && (
                <View>
                    <Text>Latitud: {location.latitude}</Text>


                    <Text>Longitud: {location.longitude}</Text>


                    <Text>Precisión: {location.accuracy} metros</Text>
                </View>
            )}
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        gap: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});
